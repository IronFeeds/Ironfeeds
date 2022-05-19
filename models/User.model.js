const { url } = require("inspector");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  image: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652979443/Ironfeeds/profileImage_uda185.png",
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  category: 
    [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }],
  savedArticles: [{ type: Schema.Types.ObjectId, ref: "Article", default: [] }],
  createdArticles: [{ type: Schema.Types.ObjectId, ref: "Article", default: [] }]
});

const User = model("User", userSchema);

module.exports = User;
