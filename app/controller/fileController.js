const BaseController = require("./BaseController");
class fileController extends BaseController {
  constructor(context) {
    super(context);
    this.model = this.ctx.model.File;
    this.service = this.service.fileService;
  }

  async getDownloadUrl() {
    await this.service.getDownloadUrl();
  }

  async downloadFiles() {
    await this.service.downloadFiles();
  }

  async downloadFile() {
    await this.service.downloadFile();
  }

  async downloadZipFile() {
    await this.service.downloadZipFile();
  }

  async uploadFile() {
    const stream = await this.ctx.getFileStream();
    const result = await this.service.uploadFile(stream, stream.fields);
    this.ctx.setSuccess(result, "文件上传成功!");
  }

  async download() {
    const { ctx, service } = this;
    const { id, forceDownload, forceName } = ctx.query;
    const result = await service.download(id, forceName);

    if (forceDownload === "true") {
      ctx.set("Content-Disposition", result.contentDisposition);
    }
    ctx.set("Content-Type", result.contentType);
    ctx.body = result.stream;
  }

  async preview() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const result = await service.preview(id);

    ctx.set("Content-Type", result.contentType);
    ctx.set("Content-Disposition", result.contentDisposition);
    ctx.body = result.stream;
  }
}

module.exports = fileController;
