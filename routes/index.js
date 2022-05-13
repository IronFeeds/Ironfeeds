

const router = require('express').Router();
const API = "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY
const Article = require("../models/Article.model")

router.get("/", (req, res)=>
Article.find().populate("category")
.then((articles)=>res.render("index", {name:articles}))
          
)
module.exports = router;
