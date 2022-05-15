const express = require("express");
const Category = require("../models/Category.model");

const router = express.Router();

router
  .route("/categories")
  .get((req, res) => {
    res.render("categories", {categories:Category});
  })
  .post((req, res) => {
   /*  const { general, business, entertainment, health, science, sports } =
      req.body;
    Category.findOne(req.body)
      .then(() => res.redirect("/categories"))
      .catch((err) => console.log(err)); */
  });


router.post("categories/delete"), (module.exports = router);






/* document.getElementsByClassName("category").forEach((el) => {
    el.addEventListener("click", (event) => {
      const category = event.target;
      const user = req.session.currentUser;
      if (user.category.findOne(category)){
        user.category.split(user.category.indexOf(category),1)
      }
        else{
            user.category.push(category)
        }
    });
  }); */