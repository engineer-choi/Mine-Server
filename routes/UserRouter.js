const router = require("express").Router();
// let UserModel = require("../models/UserModel");
// router.route("/").get((req, res) => {
//   UserModel.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Err: " + err));
// });

const { googleLogin } = require("../controllers/UserController");
router.post("/googlelogin", googleLogin);

module.exports = router;
