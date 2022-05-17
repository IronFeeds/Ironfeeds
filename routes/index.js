const router = require("express").Router();
const API =
  "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY;
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const isLoggedIn = require("../middleware/isLoggedIn")
//Save an article

router.get("/", isLoggedIn, (req, res) =>
  Article.find()
    .populate("category")
    .then((articles) => res.render("index", { name: articles }))
);

router.post("/user/save/:articleid", (req, res) => {
  const user = req.session.currentUser;
  const { articleid } = req.params;
  User.findOne({ _id: user._id, $in: { savedArticles: articleid } }).then(
    (user) => {
      if (!user) {
        User.findByIdAndUpdate(
          user._id,
          { $push: { savedArticles: articleid } },
          { new: true }
        );
        console.log("nobody");
      } else {
        User.findByIdAndUpdate(
          user._id,
          { $pull: { savedArticles: {$in: articleid } }}
        );
        console.log("user", user);
      }
    }
  );
  /*      .then(()=> res.redirect(`/#${articleid}`))  */
});

module.exports = router;
