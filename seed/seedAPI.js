require("dotenv/config")
require('../db/index')
const axios = require("axios")
const mongoose = require('mongoose');
const Category = require("../models/Category.model")

const Article = require("../models/Article.model")

const API = "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY

axios.get(API)

.then(response => {
    response.data.data.forEach((el)=>
   
        Category.findOne({name:el.category})
        .then((category)=>
        {const categoryID = category._id
        Article.create({
                title: el.title,
                url:el.url,
                description: el.description,
                category: categoryID,
                image: el.image,
                source: el.source,
                language:el.language,
                country: el.country,
                published_at: el.published_at,
                owner:null
            })}
            )
        
    )
})

.then(()=>{
    console.log(`${Article.length} articles successfully created`)
//   mongoose.connection.close()
})
  .catch(()=>console.log("couldn't add the drones"))


