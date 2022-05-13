const express = require('express');
const router = express.Router();


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