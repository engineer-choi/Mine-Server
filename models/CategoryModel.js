const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "CategoryID",
    },
    authorEmail: {
      type: String,
      ref: "PersonID",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("CategoryModel", categorySchema);

module.exports = CategoryModel;
