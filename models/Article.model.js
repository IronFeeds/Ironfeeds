const { STATUS_CODES } = require("http");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
 
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
  },
  image: {
    type: String,
  },
  category: 
    { type: Schema.Types.ObjectId, ref: "Category"},
  language: {
    type: String,
    enum: [
      "ar",
      "de",
      "en",
      "es",
      "fr",
      "he",
      "it",
      "nl",
      "no",
      "pt",
      "ru",
      "se",
      "zh",
    ],
  },
  country: {
    type: String,
    required: true,
    // enum: [
    //   "Argentina",
    //   "Australia",
    //   "Austria",
    //   "Belgium",
    //   "Brazil",
    //   "Bulgaria",
    //   "Canada",
    //   "China",
    //   "Colombia",
    //   "Czech Republic",
    //   "Egypt",
    //   "France",
    //   "Germany",
    //   "Greece",
    //   "Hong Kong",
    //   "Hungary",
    //   "India",
    //   "Indonesia",
    //   "Ireland",
    //   "Israel",
    //   "Italy",
    //   "Japan",
    //   "Latvia",
    //   "Lithuania",
    //   "Malaysia",
    //   "Mexico",
    //   "Morocco",
    //   "Netherlands",
    //   "New Zealand",
    //   "Nigeria",
    //   "Norway ",
    //   "Philippines",
    //   "Poland",
    //   "Portugal",
    //   "Romania",
    //   "Saudi Arabia",
    //   "Serbia",
    //   "Singapore",
    //   "Slovakia",
    //   "Slovenia",
    //   "South Africa",
    //   "South Korea",
    //   "Sweden",
    //   "Switzerland",
    //   "Taiwan",
    //   "Thailand",
    //   "Turkey",
    //   "UAE",
    //   "Ukraine",
    //   "United Kingdom",
    //   "United States",
    //   "Venuzuela",
    // ],
    published_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    owner:{
      type: Schema.Types.ObjectId, ref: "User", required: true, default:null
    }
  },
});

const Article = model("Article", articleSchema);

module.exports = Article;
