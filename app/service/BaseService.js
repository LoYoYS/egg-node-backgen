const Service = require("egg").Service;
module.exports = class BaseService extends Service {
  constructor(context) {
    super(context);
    this.model = null;
  }

  async findAndCountAll(options = {}) {
    options.offset = options.offset || 0;
    options.limit = options.limit || 1000;
    options.order = options.order || [["created_at", "desc"]];
    if (options.countOnly) {
      const result = await this.model.count(options);
      return { data: [], count: result };
    } else {
      const result = await this.model.findAndCountAll(options);
      return { data: result.rows, count: result.count, offset: options.offset, limit: options.limit };
    }
  }

  async findAll(options = {}) {
    options.offset = options.offset || 0;
    options.limit = options.limit || 1000;
    options.order = options.order || [["created_at", "desc"]];
    const result = await this.model.findAll(options);
    return { data: result, offset: options.offset, limit: options.limit };
  }

  async get(id) {
    return this.model.findByPk(id);
  }

  async getOne(options) {
    return this.model.findOne(options);
  }

  async add(row) {
    const result = await this.model.create(row);
    return { msg: "新增成功!", data: result, code: 0 };
  }

  async update(row) {
    const oldRow = await this.model.findByPk(row.id);
    if (!oldRow) return { msg: `没有找到id为${row.id}的记录`, code: 1 };
    const result = await oldRow.update(row);
    return { msg: "更新成功!", data: result, code: 0 };
  }

  async delete(id) {
    const oldRow = await this.model.findByPk(id);
    if (!oldRow) return { msg: `没有找到id为${id}的记录`, code: 1 };
    const result = await this.oldRow.destroy();
    return { msg: "删除成功!", data: result, code: 0 };
  }
};
