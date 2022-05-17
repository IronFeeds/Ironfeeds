const router = require("express").Router();
const API =
  "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY;
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const isLoggedIn = require("../middleware/isLoggedIn")

const { count } = require("../models/Article.model");

//Save an article

router.get("/", isLoggedIn, (req, res) => {
  
  Article.countDocuments()
  .then((count)=>{
      //pagination////////
      let { page = 1, perPage = 10 } = req.query;
      page = parseInt(page);
      perPage = parseInt(perPage);
    
      const limit = perPage;
      const skip = (page - 1) * perPage;
    
      const totPages = Math.ceil(count/perPage)

      //prevpage
      let prevPage = page-1;
      if(prevPage <= 0) prevPage = 1;
    
      //nextpage
      let nextPage = page + 1;
      if(nextPage >= totPages ) nextPage = totPages;

  Article.find()
    .populate("category")
    .limit(limit)
    .skip(skip)
    .then((articles) =>{
      res.render("index", {
        name: articles,
        page,
        prevPage,
        nextPage,
        perPage,
        totPages
      })}
    )
})
.catch((err) => console.log(err));
});

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
        User.findByIdAndUpdate(user._id, {
          $pull: { savedArticles: { $in: articleid } },
        });
        console.log("user", user);
      }
    }
  );
  /*      .then(()=> res.redirect(`/#${articleid}`))  */
});

module.exports = router;
