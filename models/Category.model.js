const { STATUS_CODES } = require("http");
const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  General: { type: String },
  Business: { type: String },
  Entertainment: { type: String },
  Health: { type: String },
  Science: { type: String },
  Sports: { type: String },
});

const Category = model("Category", categorySchema);
module.exports = Category;