const jwt = require("../modules/jwt");
const MSG = require("../modules/responseMessage");
const CODE = require("../modules/statusCode");
const util = require("../modules/util");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    var token = req.headers.authorization;
    if (!token) {
      return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN)); // 빈 토큰
    }
    const user = await jwt.verify(token);
    if (user === TOKEN_EXPIRED) {
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN)); //토큰 만료
    }
    if (user === TOKEN_INVALID) {
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN)); // 토큰 비정상
    }
    req.decoded = user;
    next();
  },
};
module.exports = authUtil;
