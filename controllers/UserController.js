const { OAuth2Client } = require("google-auth-library");
const UserModel = require("../models/UserModel");
const CLIENT_ID = "315192344553-rc30mk3chvet9t3t7bf28i26iafpiu1d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const jwt = require("../modules/jwt");

exports.googleLogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;
      if (email_verified) {
        UserModel.findOne({
          email,
        }).exec(async (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong...",
            });
          } else {
            if (user) {
              const tokens = await jwt.sign(user);
              const accessToken = tokens.accessToken;
              const { _id, name, email, picture } = user;
              res.json({
                accessToken,
                user: {
                  _id,
                  name,
                  email,
                  picture,
                },
              });
            } else {
              let newUser = new UserModel({
                name,
                email,
                picture,
              });
              newUser.save(async (err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "Something went wrong...",
                  });
                }
                const tokens = await jwt.sign({ _id: data._id });
                const accessToken = tokens.accessToken;
                const { _id, name, email, picture } = newUser;
                res.json({
                  accessToken,
                  newUser: {
                    _id,
                    name,
                    email,
                    picture,
                  },
                });
              });
            }
          }
        });
      }
    });
};
