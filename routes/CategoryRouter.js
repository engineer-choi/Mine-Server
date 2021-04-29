const router = require("express").Router();
const AuthUtil = require("../middlewares/auth");

const {category} = require("../controllers/CategoryController");
router.get('/', AuthUtil.checkToken, category);// /category로 요청할 때

module.exports = router;