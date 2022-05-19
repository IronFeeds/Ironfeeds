const { STATUS_CODES } = require("http");
const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String,
    enum: [
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
    ], },
    imageSelected: {
      type: String
    },
    imageNotSelected: {
      type: String
    }
  
});

const Category = model("Category", categorySchema);
module.exports = Category;