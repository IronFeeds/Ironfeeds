const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")

const User = require("../models/User.model");
const Article = require("../models/Article.model");
const Category = require("../models/Category.model");
const fileUploader = require("./../config/cloudinary");


const Handlebars = require("handlebars");

//delete article
router.post("/profile/:articleId/delete", (req, res) => {
  const { articleId } = req.params;
  const userId = req.session.currentUser._id
  Article.findByIdAndDelete(articleId)
  .then(()=>User.findByIdAndUpdate(userId, { $pull: { createdArticles: articleId } }))
  
    .then(() => res.redirect("/profile"))
    .catch((err) => console.log(err));
});

//Edit article
router
  .route("/profile/:articleId/edit")
  .get(isLoggedIn, (req, res) => {
    const { articleId } = req.params;
    Article.findById(articleId)
      .populate("category")
      .then((article) =>
        Category.find().then((categories) => {
            const articleCategory = article.category
          const categoriesWithChosen = categories.map((category)=> {
            const chosen = articleCategory.equals(category._id)
            return {
                _id: category._id,
                name: category.name,
                chosen: chosen,
              };
          })
            res.render("editArticle", { name: article, categories:categoriesWithChosen })
            
        })
      );
  })
  .post(fileUploader.single("imageUrl"), (req, res) => {
    const { articleId } = req.params;
    const { title, url, description, categories } = req.body;
   
    Category.findById( categories )
    .then((category) =>
    { const categoryID = category._id
        console.log("cateories", categoryID)
        
        Article.findByIdAndUpdate(articleId, {
        title,
        url,
        description,
        category: categoryID
      }, {new:true}) 
      .then(()=>{
          if(req.file){
            const imageUrl = req.file.path;
            Article.findByIdAndUpdate(articleId,
                {image: imageUrl}, {new:true})
          }
      })
      .then(()=>res.redirect("/profile"))}
    )
    .catch((err) => console.log(err))
    
  });

//Create a new article
router
  .route("/profile/add")
  .get(isLoggedIn, (req, res) => {
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

router.route("/profile").get(isLoggedIn, (req, res) => {
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
