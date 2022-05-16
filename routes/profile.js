const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Article = require("../models/Article.model");
const Category = require("../models/Category.model");
const fileUploader = require("./../config/cloudinary");

const Handlebars = require("handlebars");

//delete article
router.post("/profile/:articleId/delete", (req, res) => {
  const { articleId } = req.params;
  Article.findByIdAndDelete(articleId)
    .then(() => res.redirect("/profile"))
    .catch((err) => console.log(err));
});

//Edit article
router
  .route("/profile/:articleId/edit")
  .get((req, res) => {
    const { articleId } = req.params;
    Article.findById(articleId)
      .populate("category")
      .then((article) =>
        Category.find().then((categories) => {
          res.render("editArticle", { name: article, categories }),
            Handlebars.registerHelper("chosenCat", function () {
              return categories._id === article.category;
            });
        })
      );
  })
  .post(fileUploader.single("imageUrl"), (req, res) => {
    const { articleId } = req.params;
    const { title, url, description, categories } = req.body;
    const imageUrl = req.file.path;
    Category.findOne({ name: categories }).then((category) =>
      Article.findByIdAndUpdate(articleId, {
        title,
        url,
        description,
        category: category._id,
        image: imageUrl,
      })
    );
    res.redirect("/profile").catch((err) => console.log(err));
  });

//Create a new article
router
  .route("/profile/add")
  .get((req, res) => {
    Category.find().then((cat) => res.render("addArticles", { cat }));
  })
  .post(fileUploader.single("imageUrl"), (req, res) => {
    const user = req.session.currentUser;
    const { title, url, description, categories } = req.body;
    const imageUrl = req.file.path;
    Category.findById(categories)
    .then((category)=>{
    const categoryId = category._id
    Article.create({
        title,
        url,
        description: description,
        category:categoryId,
        image: imageUrl
    })
    .then((createdArticle)=> 
          {
          const articleId = createdArticle._id 
          User.findByIdAndUpdate(user._id, {$push: { createdArticles : articleId }}, {new:true})
          .then((user)=>console.log(user))
         
        })
          
        })
        .then(()=>res.redirect("/profile"))
        .catch(err=>console.log(err))          
     })
          
//Go to profile
router.route("/profile").get((req, res) => {
  const user = req.session.currentUser._id;
  User.findById(user)
    .populate("createdArticles savedArticles")
    .then((user) => {
      console.log(user);
      res.render("profile", {
        user,

        userArticles: user.createdArticles,
        savedArticles: user.savedArticles,
      });
    });
});

module.exports = router;
