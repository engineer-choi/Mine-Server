const MSG = require("../modules/responseMessage");
const CODE = require("../modules/statusCode");
const CategoryModel = require("../models/CategoryModel");
const util = require("../modules/util");

exports.category = (req, res) => {
  res.json(util.success(CODE.OK, MSG.AUTH_SUCCESS));
};
