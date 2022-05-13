const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Article = require("../models/Article.model")

router.route("/profile")
.get((req, res)=> {
    res.render("profile")
})

router.route("/profile/add")
.get((req, res)=> {
    res.render("addArticle")
})


router.route("/profile/:articleId/edit")
.get((req, res)=> {
    res.render("editArticle")
})


module.exports = router;