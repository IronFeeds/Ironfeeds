const User = require("../models/User.model")
const Article = require("../models/Article.model")
const axios = require('axios')
const router = require('express').Router();

const API = "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY

axios.get(API)
.then(response => {
    console.log("API data", Object.values(response.data.data))})
.catch(err=>console.log(err))
        // response.array.forEach(el => {
        //     Article.create({
        //         title: el.data.data.title,
        //         url:el.data.data.url,
        //         description: el.data.data.description,
        //         category: el.data.data.category,
        //         image: el.data.data.image,
        //         source: el.data.data.source,
        //         language:el.data.data.language,
        //         country: el.data.data.country,
        //         published_at: el.data.data.published_at
        //     })
        //})
         

module.exports = router;
