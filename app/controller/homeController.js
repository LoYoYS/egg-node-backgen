"use strict";
const BaseController = require("./BaseController");

class homeController extends BaseController {
  async index() {
    const { ctx } = this;
    ctx.setSuccess("Hello World");
  }
}

module.exports = homeController;
