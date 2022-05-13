const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Article = require("../models/Article.model")

//Go to profile
router.route("/profile")
.get((req, res)=> {
    res.render("profile", {user: req.session.currentUser})
})

router.route("/profile/add")
.get((req, res)=> {
    res.render("addArticle")
})
.post((req, res)=>
{
    const userId = req.session.currentUser._id;
    const { title, url, description, categories } = req.body;
    const imageUrl = req.file.path
    Article.create({
        title,
        url,
        description,
        category:categories,
        imageUrl
    })
    .then((createdArticle)=> 
          User.findById(userId)
          .then((user)=>user.articles.push(createdArticle._id)))
          .catch(err=>console.log(err))
    res.redirect("/profile")
}
)


router.route("/profile/:articleId/edit")
.get((req, res)=> {
    res.render("editArticle")
})


module.exports = router;