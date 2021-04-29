const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;