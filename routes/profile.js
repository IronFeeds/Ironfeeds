const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Article = require("../models/Article.model")

//Go to profile
router.route("/profile")
.get((req, res)=> {
    Article.find({owner:req.session.currentUser}).populate("categories")
    .then((userArticles)=>{
        User.find().populate("articles")
        .then((users)=> 
        res.render("profile", 
        {user: req.session.currentUser,
        userArticles: userArticles,
        savedArticles: users.articles}))
       
    })
    
})

//Create a new article
router.route("/profile/add")
.get((req, res)=> {
    res.render("addArticle")
})
.post((req, res)=>
{
    const userId = req.session.currentUser._id;
    const { title, url, description, categories } = req.body;
    const imageUrl = req.file.path
    Category.findOne({name: categories})
    .then((category)=>
    Article.create({
        title,
        url,
        description,
        category:category._id,
        image: imageUrl
    })
    .then((createdArticle)=> 
          User.findById(userId)
          .then((user)=>user.articles.push(createdArticle._id))))
          .catch(err=>console.log(err))
    res.redirect("/profile")
}
)


router.route("/profile/:articleId/edit")
.get((req, res)=> {
    const {articleId} = req.params
    Article.findById(articleId).populate(category)
    .then((article)=>
    res.render("editArticle", {name:article}))
})
.post((req, res)=> {
    const {articleId} = req.params
    const { title, url, description, categories } = req.body;
    const imageUrl = req.file.path
    Category.findOne({name: categories})
    .then((category)=>
    Article.findByIdAndUpdate(articleId,{
        title,
        url,
        description,
        category:category._id,
        image: imageUrl
    }))
    res.redirect("/profile")
    .catch(err=>console.log(err))
})


router.post("/profile/:articleId/delete", (req, res)=>{
    const {articleId} = req.params;
    Article.findByIdAndDelete(articleId)
    res.redirect("/profile")
})



module.exports = router;