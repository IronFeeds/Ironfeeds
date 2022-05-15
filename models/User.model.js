const { url } = require("inspector");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  image: {
    type: String,
    required: true,
    default:
      "https://images.assetsdelivery.com/compings_v2/meysye/meysye1904/meysye190400002.jpg",
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
