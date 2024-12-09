const Controller = require("egg").Controller;
const { Op, DATE } = require("sequelize");

const opQueryStrings = [
  "ne",
  "gt",
  "not",
  "or",
  "between",
  "notBetween",
  "gte",
  "lt",
  "lte",
  "in",
  "notIn",
  "like",
  "startsWith",
  "endsWith",
  "substring",
  "eq",
  "is"
];
module.exports = class BaseController extends Controller {
  async get() {
    if (!this._beforeGet()) return;
    const id = this.ctx.params.id ?? this.ctx.request.query.id;
    const result = await this.service.get(id);
    this._afterGet(result);
    this.ctx.setSuccess(result, "查询成功!");
  }

  async getOne() {
    if (!this._beforeGet()) return;
    const options = this.handleQueryParams(this.ctx.request.query);
    const result = await this.service.getOne(options);
    this._afterGet(result);
    this.ctx.setSuccess(result, "查询成功!");
  }

  async findAll() {
    if (!this._beforeFindAll()) return;

    this._foreignFiled = this.ctx.request.query?._foreignFiled || "";
    const options = this.handleQueryParams(this.ctx.request.query);
    const result = await this.service.findAll(options);
    await this.handleForeignFiled(result.data);

    this._afterFindAll(result);
    this.ctx.setSuccess(result, "查询成功!");
  }

  async findAndCountAll() {
    if (!this._beforeFindAndCountAll()) return;

    this._foreignFiled = this.ctx.request.query?._foreignFiled || "";
    const options = this.handleQueryParams(this.ctx.request.query);
    const result = await this.service.findAndCountAll(options);
    await this.handleForeignFiled(result.data);

    this._afterFindAndCountAll(result);
    this.ctx.setSuccess(result, "查询成功!");
  }

  async add() {
    if (!this._beforeAdd()) return;

    this.paramsToDate(this.ctx.request.body);
    this.ctx.request.body.uidCreated = this.ctx.uid;
    this.ctx.request.body.uidUpdated = this.ctx.uid;
    const result = await this.service.add(this.ctx.request.body);

    this._afterAdd(result);
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async update() {
    if (!this._beforeUpdate()) return;

    this.paramsToDate(this.ctx.request.body);

    this.ctx.request.body.uidUpdated = this.ctx.uid;
    const result = await this.service.update(this.ctx.request.body);

    this._afterUpdate(result.data);
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async delete() {
    if (!this._beforeDelete()) return;
    const id = this.ctx.request.body.id;
    const result = await this.service.delete(id);
    this._afterDelete(id, result);
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async handleForeignFiled(objArr) {
    if (!this._foreignFiled) return;
    let arr = this._foreignFiled.split(",");
    if (arr.length !== 4) return;
    // 当前表的字段名（外键id）,外联表Model名，外联表Field名，绑定到当前对象上的名称

    let foreignIdName = arr[0];
    let foreignModelName = arr[1];
    let foreignFieldName = arr[2];
    let tempFieldName = arr[3];

    // todo 这里必须是单层model才行，如果model内有文件夹，则失败
    if (!this.ctx.model[foreignModelName]) return;

    let idArr = [];
    objArr?.forEach((e) => {
      idArr.push(e[foreignIdName]);
    });
    idArr = [...new Set(idArr)]; // 去重

    // todo  idArr大于1000时，可能会报错；超过in查询的限制

    let foreignArr = await this.ctx.model[foreignModelName].findAll({
      attributes: ["id", foreignFieldName],
      where: { id: idArr }
    });
    let index = {};
    foreignArr?.forEach((e) => {
      index[e.id] = e[foreignFieldName];
    });

    // 为了绑定临时字段，这里把model转成了json；对统一性是有破坏的
    for (let i = 0; i < objArr.length; i++) {
      objArr[i] = objArr[i].toJSON();
      objArr[i][tempFieldName] = index[objArr[i][foreignIdName]];
    }
  }

  handleQueryParams(params) {
    params = JSON.parse(JSON.stringify(params));
    const where = {};

    // 1. 处理固定字段
    let {
      _attributes: attributes,
      _attributesExclude: attributesExclude,
      _limit: limit,
      _offset: offset,
      _countOnly: countOnly,
      _order: order
    } = params;

    delete params._attributes;
    delete params._attributesExclude;
    delete params._limit;
    delete params._offset;
    delete params._countOnly;
    delete params._order;
    delete params._foreignFiled;

    limit = Number(limit) || 1000;
    offset = Number(offset) || 0;
    order = order && [order.split(",")];

    if (attributes) {
      attributes = attributes?.split(",");
    }
    if (attributesExclude) {
      attributesExclude = attributesExclude?.split(",");
      attributes = { exclude: attributesExclude };
    }

    this.paramsToDate(params);

    // 2. 处理表字段
    for (const parmsKey in params) {
      const parmValue = params[parmsKey];
      const arr = parmsKey.split(",");

      // 查询了不存在的参数，忽略
      if (!this.model.rawAttributes[arr[0].split(".")[0]] && arr[0] !== "Op") continue;

      if (arr.length === 2) {
        const key = arr[0];
        const op = arr[1];
        if (key === "Op") {
          const value = parmValue.split(",");
          for (const string of value) {
            const innerArr = string.split(":");
            const keyString = innerArr[0].trim();
            if (!this.model.rawAttributes[keyString.split(".")[0]]) continue;
            where[Op[op]] = where[Op[op]] ? where[Op[op]] : [];
            const valueString = innerArr[1].trim();
            where[Op[op]].push({ [keyString]: valueString });
          }
        } else if (opQueryStrings.includes(op)) {
          if (!(where[key] instanceof Object)) {
            where[key] = {};
          }
          if (op === "not" || op === "or" || op === "between" || op === "notBetween" || op === "in" || op === "notIn") {
            where[key][Op[op]] = parmValue.includes(",")
              ? parmValue.split(",").map((value) => (value === "null" ? null : value))
              : parmValue;
          } else if (op === "is") {
            where[key][Op.is] = null;
          } else {
            where[key][Op[op]] = parmValue;
          }
        }
      } else if (arr.length === 1) {
        where[parmsKey] = parmValue;
      }
    }
    return { attributes, where, limit, offset, order, countOnly };
  }

  paramsToDate(parmas) {
    for (const key in parmas) {
      const newKey = key?.split(",")[0];
      if (this.model.rawAttributes[newKey]?.type instanceof DATE) {
        parmas[key] = this.ctx.helper.stringOrIntToDate(parmas[key]);
      }
    }
  }

  _beforeGet() {
    return true;
  }

  _beforeFindAll() {
    return true;
  }

  _beforeFindAndCountAll() {
    return true;
  }

  _beforeUpdate() {
    return true;
  }

  _beforeAdd() {
    return true;
  }

  _beforeDelete() {
    return true;
  }

  _afterGet() {}
  _afterFindAll() {}
  _afterFindAndCountAll() {}
  _afterUpdate() {}
  _afterAdd() {}
  _afterDelete() {}

  get uid() {
    return this.ctx.Account.id;
  }
  get Account() {
    return this.ctx.Account;
  }
  get body() {
    return this.ctx.request.body;
  }
  get params() {
    return this.ctx.params;
  }
  get utils() {
    return this.ctx.helper;
  }
  get queryParams() {
    return this.ctx.query;
  }
  get FileManager() {
    return this.app.FileManager;
  }
  get AuthenticationManager() {
    return this.app.AuthenticationManager;
  }
};
