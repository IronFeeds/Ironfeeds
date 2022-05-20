const router = require("express").Router();
const API =
  "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY;
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const isLoggedIn = require("../middleware/isLoggedIn");

const { count } = require("../models/Article.model");
const mongoose = require("mongoose");

//Save an article

router.get("/", isLoggedIn, (req, res) => {
  Article.countDocuments()
    .then((count) => {
      //pagination////////
      let { page = 1, perPage = 10 } = req.query;
      page = parseInt(page);
      perPage = parseInt(perPage);

      const limit = perPage;
      const skip = (page - 1) * perPage;

      const totPages = Math.ceil(count / perPage);

      //prevpage
      let prevPage = page - 1;
      if (prevPage <= 0) prevPage = 1;

      //nextpage
      let nextPage = page + 1;
      if (nextPage >= totPages) nextPage = totPages;

      Article.find()
      .populate("category")
      .limit(limit)
      .skip(skip)
      .then((articles) =>{
        User.findById(req.session.currentUser._id)
        .then((user)=>{
  
          const userCategories = user.category
  
          const filteredArticles =[]
          function filterArticle(article){
            userCategories.some((category) => {
              if (category.equals(article.category._id) && user.savedArticles.includes(article._id) )
              {filteredArticles.push({
                _id: article._id,
                title: article.title,
                category: article.category.name,
                image: article.image,
                description:article.description,
                country: article.country,
                url: article.url,
                saved: true,}
                )}

                else if(category.equals(article.category._id) && !(user.savedArticles.includes(article._id)) )
                {filteredArticles.push({
                  _id: article._id,
                  title: article.title,
                  category: article.category.name,
                  image: article.image,
                  description:article.description,
                  country: article.country,
                  url: article.url,
                  saved: false}
                  )}
            })
          }
          articles.forEach(article=>filterArticle(article))
          
  
        res.render("index", {
          page,
          prevPage,
          nextPage,
          perPage,
          totPages,
          name: filteredArticles,
          user
        })}
      )
  
  })})
  .catch((err) => console.log(err));  
   })

router.post("/user/save/:articleId", (req, res, next) => {
  const user = req.session.currentUser;
  const { articleId } = req.params;
  User.findById(user._id)
  .then((user) => {
    if(user.savedArticles.includes(articleId)){
      user.savedArticles.splice(user.savedArticles.indexOf(articleId), 1)
    }else{
      user.savedArticles.push(articleId)
    }
    user.save()
    res.json("Added article to favourites!!!")
    }
  );
  /*      .then(()=> res.redirect(`/#${articleid}`))  */
});

router.post("/user/unsave/:articleId", (req, res, next) => {
  const user = req.session.currentUser;
  const { articleId } = req.params;
  User.findById(user._id)
  .then((user) => {
    
      user.savedArticles.splice(user.savedArticles.indexOf(articleId), 1)
    
    return user.save()
    }
  )
   .then(()=> res.redirect("/profile"))
});

module.exports = router;
