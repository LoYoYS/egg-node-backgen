const Service = require("egg").Service;
const fs = require("fs");
const promisesFs = require("fs").promises;
const zlib = require("zlib");
const stream = require("stream");
const path = require("path");
const compressing = require("compressing");
const archiver = require("archiver");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

module.exports = class baseFileServeice extends Service {
  constructor(ctx) {
    super(ctx);
    this.model = this.app.model.File;
    this.basePath = this.config.file.basePath;
    this.downloadPath = this.config.file.downloadPath;
    this.uploadPath = this.config.file.uploadPath;
  }

  // 检查目录是否存在,不存在则创建
  async checkDirectoryIsExist(paths = "") {
    const { basePath, ctx } = this;
    const targetPath = path.join(basePath, paths);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true }, () => {
        ctx.throw(500, "创建文件夹错误！");
      });
    }
    return targetPath;
  }

  // 拼接根目录
  joinBasePath(paths) {
    const targetPath = path.join(this.basePath, paths);
    return targetPath;
  }

  // 复制目标文件夹或文件到指定目录下面
  copyFileToTargetDirectory(source, target) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!fs.existsSync(target)) {
          fs.mkdirSync(target, { recursive: true }, () => {
            ctx.throw(500, "创建文件夹错误！");
          });
        }
        if (!fs.existsSync(source)) return reject();
        const stat = await promisesFs.stat(source);
        if (stat.isDirectory()) {
          // 复制目录
          await promisesFs.cp(source, target, { recursive: true });
        } else {
          // 复制文件
          target = path.join(target, path.basename(source));
          // await promisesFs.copyFile(source, target, fs.constants.COPYFILE_EXCL); //文件存在报错
          await promisesFs.copyFile(source, target); //覆盖文件
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // 删除文件夹或文件
  deleteFileOrDirectory(paths) {
    return new Promise(async (resolve, reject) => {
      if (!paths) reject();
      try {
        // 检查路径是否存在
        if (!fs.existsSync(paths)) reject();
        const stat = await promisesFs.stat(paths);
        if (stat.isDirectory()) {
          // 递归删除文件夹及其内容
          if (promisesFs.rm) {
            await promisesFs.rm(paths, { recursive: true, force: true });
          } else {
            await promisesFs.rmdir(paths, { recursive: true });
          }
        } else {
          await promisesFs.unlink(paths);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // 写入流文件
  async writeStreamFile(stream, targetPath) {
    return new Promise(async (resolve, reject) => {
      try {
        /* if (fs.existsSync(filepath)) {
          const name = file.filename.slice(0, file.filename.lastIndexOf("."));
          const suffix = file.filename.slice(file.filename.lastIndexOf("."));
          const newFileName = `${name}_${dayjs.formatDate(
            new Date(),
            "YYYY-MM-DD-HH-mm-ss"
          )}${suffix}`;
          filepath = path.join(targetPath, newFileName);
        } */
        const dest = fs.createWriteStream(targetPath);
        stream.pipe(dest);
        // 等待流完成
        const result = await new Promise((res, rej) => {
          dest.on("finish", () => {
            promisesFs.stat(targetPath).then((fileInfo) => {
              res(fileInfo);
            });
          });
          dest.on("error", rej);
        });
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  // 通过路径读取一个文件夹下的子文件夹以及文件
  async getFileTree(dirPath) {
    const fullPath = path.join(this.basePath, dirPath);
    const stats = await promisesFs.stat(fullPath);
    const fileTree = {
      id: this.ctx.helper.uuid(),
      path: dirPath,
      name: path.basename(dirPath),
      type: "directory",
      size: 0, // 初始化目录大小为0
      lastModified: stats.mtime, // 直接使用目录的最后修改时间
      children: []
    };

    let items;
    try {
      items = await promisesFs.readdir(fullPath);
    } catch (err) {
      console.error(`Error reading directory ${fullPath}: ${err}`);
      return fileTree;
    }

    for (const item of items) {
      const subFullPath = path.join(this.basePath, dirPath, item);
      let itemStats;
      try {
        itemStats = await promisesFs.stat(subFullPath);
      } catch (err) {
        console.error(`Error getting stats of ${subFullPath}: ${err}`);
        continue;
      }

      let children = {
        id: this.ctx.helper.uuid(),
        path: path.join(dirPath, item),
        name: item,
        lastModified: itemStats.mtime,
        size: 0,
        type: "directory"
      };
      if (itemStats.isFile()) {
        children.size = itemStats.size;
        children.type = "file";
      }
      if (itemStats.isDirectory()) {
        const childDir = await this.getFileTree(path.join(dirPath, item)); // 递归调用
        fileTree.size += childDir.size; // 累加子目录大小
        fileTree.children.push(childDir);
      } else {
        fileTree.children.push({
          path: path.join(dirPath, item),
          name: item,
          type: "file",
          size: itemStats.size,
          lastModified: itemStats.mtime // 设置文件的最后修改时间
        });
        fileTree.size += itemStats.size; // 累加文件大小
      }
      fileTree.children.push(children);
    }

    return fileTree;
  }

  // 在指定目录下创建文件夹
  createFolder(directoryPath, folderName) {
    return new Promise((resolve, reject) => {
      const newFolderPath = path.join(this.basePath, directoryPath, folderName);
      promisesFs
        .mkdir(newFolderPath, { recursive: true })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  // 获取下载链接
  async getDownloadUrl() {
    const { ctx, basePath, downloadPath } = this;
    const filesAndFolders = ctx.request.body.files;
    let zipFilePath;
    try {
      if (filesAndFolders.length === 1) {
        const itemPath = path.join(basePath, filesAndFolders[0]); //拿到的是文件路径
        const fileName = path.basename(itemPath);
        const stats = await promisesFs.stat(itemPath);
        let downloadUrl;
        if (stats.isFile()) {
          downloadUrl = `${ctx.origin}/api/file/download/${encodeURIComponent(filesAndFolders[0])}`;
        } else if (stats.isDirectory()) {
          const zipFileName = `${encodeURIComponent(fileName)}.zip`;
          zipFilePath = path.join(basePath, downloadPath, zipFileName);
          const output = fs.createWriteStream(zipFilePath);
          const archive = archiver("zip", {
            zlib: { level: 9 }
          });

          archive.pipe(output);

          archive.directory(itemPath, false);
          await archive.finalize();

          downloadUrl = `${ctx.origin}/api/file/download/${zipFilePath}`;
        }
        return downloadUrl;
      }
      // 多个文件或文件夹，压缩后下载
      const zipFileName = `${new Date().getTime()}.zip`;
      zipFilePath = path.join(basePath, downloadPath, zipFileName); // 临时目录
      const output = fs.createWriteStream(zipFilePath);

      const archive = archiver("zip", {
        zlib: { level: 9 } // 设置压缩级别
      });
      archive.pipe(output);

      // 递归添加文件和文件夹
      for (const item of filesAndFolders) {
        const itemPath = path.join(basePath, item);
        if (fs.statSync(itemPath).isDirectory()) {
          archive.directory(itemPath, path.basename(itemPath));
        } else {
          archive.file(itemPath, { name: path.basename(itemPath) });
        }
      }
      await archive.finalize();
      return `${ctx.origin}/api/file/download/${zipFilePath}`;
    } catch (error) {
      if (zipFilePath && fs.existsSync(zipFilePath)) {
        fs.unlink(zipFilePath);
      }
      ctx.throw(500, error);
    }
  }

  //下载文件，直流式
  async downloadFiles() {
    const { ctx, basePath } = this;
    let filesAndFolders = ctx.request.body.files;
    if (!Array.isArray(filesAndFolders) && filesAndFolders) {
      filesAndFolders = new Array(filesAndFolders);
    }
    try {
      // 一个文件或一个文件夹
      if (filesAndFolders.length === 1) {
        const itemPath = path.join(basePath, filesAndFolders[0]);
        const fileName = path.basename(itemPath);
        const stats = await promisesFs.stat(itemPath);
        if (stats.isFile()) {
          ctx.attachment(fileName);
          ctx.body = fs.createReadStream(itemPath);
        } else if (stats.isDirectory()) {
          ctx.set("Content-Disposition", `attachment; filename="${fileName}.zip"`);
          ctx.set("Content-Type", "application/zip");
          const output = new stream.PassThrough();
          const archive = archiver("zip", {
            zlib: { level: 9 }
          });
          ctx.body = archive.pipe(output);
          archive.directory(itemPath, fileName);
          archive.finalize();
        }
      } else {
        // 多个文件或文件夹，压缩后下载
        const zipFileName = `${ctx.helper.formatDate(new Date(), "YYYYMMDDHHmmss")}.zip`;

        ctx.set("Content-Disposition", `attachment; filename="${zipFileName}"`);
        ctx.set("Content-Type", "application/zip");

        const output = new stream.PassThrough();

        const archive = archiver("zip", {
          zlib: { level: 9 } // 设置压缩级别
        });

        // 递归添加文件和文件夹
        for (const item of filesAndFolders) {
          const itemPath = path.join(basePath, item);
          if (fs.statSync(itemPath).isDirectory()) {
            archive.directory(itemPath, path.basename(itemPath));
          } else {
            archive.file(itemPath, { name: path.basename(itemPath) });
          }
        }
        ctx.body = archive.pipe(output);
        archive.finalize();
      }
    } catch (error) {
      ctx.throw(500, error);
      // await ctx.render("errorPage.ejs", {
      //   errorMessage: "抱歉，下载出错了，请稍后再试。"
      // });
    }
  }

  // 下载单个文件
  async downloadFile() {
    const { ctx, basePath } = this;
    const { fileName } = ctx.params;

    const filePath = path.join(basePath, fileName);
    try {
      ctx.attachment(decodeURIComponent(fileName));
      ctx.body = fs.createReadStream(filePath);
    } catch (error) {
      ctx.throw(500, error);
    }
  }

  // 下载压缩包
  async downloadZipFile() {
    const { ctx, basePath, downloadPath } = this;
    const { fileName } = ctx.params;
    const filePath = path.join(basePath, downloadPath, fileName);
    try {
      ctx.attachment(decodeURIComponent(fileName));
      ctx.body = fs.createReadStream(filePath);
      // 可选：下载后删除文件
      ctx.res.on("finish", () => {
        fs.unlink(filePath, (err) => {
          if (err) ctx.logger.error(`Error deleting ${filePath}: ${err}`);
        });
      });
    } catch (error) {
      fs.unlink(filePath, (err) => {
        if (err) ctx.logger.error(`Error deleting ${filePath}: ${err}`);
      });
      ctx.throw(500, error);
    }
  }

  // 获取一个目录的大小
  async getFolderSize(folderPath) {
    let totalSize = 0;
    try {
      async function calculateSize(dirPath) {
        const files = await promisesFs.readdir(dirPath);
        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const fileStat = await promisesFs.stat(filePath);
          if (fileStat.isDirectory()) {
            await calculateSize(filePath); // 递归计算子文件夹
          } else {
            totalSize += fileStat.size; // 累加文件大小
          }
        }
      }
      const fatherStat = await promisesFs.stat(folderPath);
      if (fatherStat.isDirectory()) {
        await calculateSize(folderPath);
      } else {
        return fatherStat.size; // 累加文件大小
      }
    } catch (error) {}
    return totalSize;
  }

  /**
   * 检查一个文件路径所包含的文件大小是否超过最大限制
   * @param {string} filePath 文件路径
   * @param {number} maxSize 文件最大限制,默认1GB
   */
  async checkFilePathSize(filePath, maxSize = 1024 * 1024 * 1024) {
    const size = await this.getFolderSize(filePath);
    return size >= maxSize;
  }

  // 解压文件
  async decompressionFile(gzipFilePath, targetFilePath) {
    const suffixPattant = /\.(zip|rar|tar|gz|tgz|bz2|7z|lz|lzma|xz|Z)$/i;
    const suffix = gzipFilePath.match(suffixPattant)[0];

    if (!fs.existsSync(targetFilePath)) {
      fs.mkdirSync(targetFilePath, { recursive: true });
    }

    // 根据不同压缩文件类型进行解压
    if (suffix === ".gz") {
      try {
        // 创建一个解压流
        const gunzip = zlib.createGunzip();
        const source = fs.createReadStream(gzipFilePath);

        const currentDerictory = gzipFilePath.replace(suffix, "");

        const fullPath = path.join(targetFilePath, path.basename(currentDerictory));
        // 先在当前文件夹解压
        const destination = fs.createWriteStream(fullPath);

        // 使用 pipeline API 来管道化流，并监听完成事件
        await pipeline(source, gunzip, destination);

        // await this.moveFiles(currentDerictory, targetFilePath);

        // 解压完成后删除压缩文件
        await promisesFs.unlink(gzipFilePath);
      } catch (error) {
        promisesFs.unlink(gzipFilePath);
        this.ctx.logger.error(error);
        this.ctx.throw(500, err);
      }
    } else {
      try {
        const currentDerictory = gzipFilePath.replace(suffix, "");
        const fullPath = path.join(targetFilePath, path.basename(currentDerictory));

        await compressing.tgz.uncompress(gzipFilePath, fullPath);

        // await this.moveFiles(currentDerictory, targetFilePath);

        promisesFs.unlink(gzipFilePath);
      } catch (err) {
        promisesFs.unlink(gzipFilePath);
        this.ctx.logger.error(err);
        this.ctx.throw(500, err);
      }
    }
  }

  // 移动解压出来的文件
  async moveFiles(currentDerictory, targetDir) {
    // 判断解压出来的是文件夹还是文件，把资源移到目标目录
    const stats = await promisesFs.stat(currentDerictory);

    if (stats.isDirectory()) {
      // 读取文件夹中的所有文件和文件夹
      const files = await promisesFs.readdir(currentDerictory);
      for (const file of files) {
        const currentPath = path.join(currentDerictory, file);
        const targetPath = path.join(targetDir, file);
        await promisesFs.rename(currentPath, targetPath);
      }

      // 删除原文件夹
      await promisesFs.rm(currentDerictory);
    } else if (stats.isFile()) {
      // 如果是文件，直接移动到目标目录
      const fileName = path.basename(currentDerictory);
      const targetPath = path.join(targetDir, fileName);
      await promisesFs.rename(currentDerictory, targetPath);
    }
  }

  /**
   * 读取文件内容的函数
   * @param {string} filePath 文件路径
   * @param {string} [encoding='utf8'] 文件编码，默认为'utf8'
   * @returns {Promise<string>}
   */
  readFileContent(filePath, encoding = "utf8") {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * 写入文本
   * @param {string} filePath 文件路径，包括文件名称
   * @param {string} content 文本内容
   * @param {string} [encoding='utf8'] 文件编码，默认为'utf8'
   * @returns {Promise<string>}
   */
  createTextFile(filePath, content, encoding = "utf8") {
    return new Promise((resolve, reject) => {
      promisesFs.writeFile(filePath, content, encoding).then(resolve).catch(reject);
    });
  }

  /**
   * 通用文件上传
   * @param {string} stream 文件流对象
   * @param {object} prop 参数对象
   * @returns {Promise<object>}
   */
  async uploadFile(stream, props = {}) {
    const { ctx, basePath, uploadPath } = this;
    const fileId = props.fileId || ctx.helper.uuid(); //生成文件唯一标识
    const fileName = props.filename ? `${props.filename}${path.extname(stream.filename)}` : "" || stream.filename; //文件名
    const mime = stream.mime; //文件类型
    const size = stream.readableLength;
    const subDir = props.subDir || "";
    const date = ctx.helper.formatDate(new Date(), "YYYYMMDD");
    const directory = path.join(uploadPath, subDir, date);
    const uri = path.join(directory, fileId + path.extname(fileName));
    if (!fs.existsSync(uri)) {
      fs.mkdirSync(uri, { recursive: true }, () => {
        ctx.throw(500, "创建文件夹错误！");
      });
    }
    const savePath = path.join(basePath, uri); //文件真实保存路径
    await this.writeStreamFile(stream, savePath);

    const record = {
      id: fileId,
      uidCreated: ctx.uid,
      uidUpdated: ctx.uid,
      fileName,
      mime,
      uri,
      size,
      props
    };
    const result = await this.addRecord(fileId, record);
    return result;
  }

  /**
   * 通用文件下载
   * @param {string} fileId 文件id
   * @param {object} forceName 是否使用别名下载
   * @returns {Promise<object>}
   */
  async download(fileId, forceName) {
    const result = await this.model.findByPk(fileId);
    if (!result) {
      this.ctx.throw(500, "文件不存在！");
    }

    const { filename, uri, mime } = result;
    const url = path.join(this.basePath, uri);
    const stream = fs.createReadStream(url);

    return {
      contentType: mime,
      contentDisposition: `attachment;filename* = UTF-8''${encodeURIComponent(forceName || filename)}`,
      stream
    };
  }

  /**
   * 通用文件预览
   * @param {string} fileId 文件id
   * @param {object} forceName 是否使用别名下载
   * @returns {Promise<object>}
   */
  async preview(fileId) {
    const result = await this.model.findByPk(fileId);
    if (!result) {
      this.ctx.throw(500, "文件不存在！");
    }

    if (!result.mime?.includes("image/")) {
      this.ctx.throw(500, "文件不可预览！");
    }

    const { filename, uri, mime } = result;
    const url = path.join(this.basePath, uri);

    const stream = fs.createReadStream(url);
    return {
      contentType: mime,
      contentDisposition: `attachment;filename* = UTF-8''${encodeURIComponent(filename)}`,
      stream
    };
  }

  // 添加记录到数据库
  async addRecord(fileId, record) {
    let [result, created] = await this.model.findOrCreate({
      where: { id: fileId },
      defaults: { id: fileId, ...record }
    });

    if (!created) {
      result = await result.update(record);
    }
    return result;
  }
};
