const express = require("express");
const Category = require("../models/Category.model");
const User = require("../models/Category.model");

const router = express.Router();

//choose a category
router
  .route("/categories")
  .get((req, res) => {
    Category.find().then((category) =>
      res.render("categories", { categories: category })
    );
  })

  .post((req, res) => {
    console.log(req.body);
    const userId = req.session.currentUser._id;
    const bodyObject = req.body
        Object.values(bodyObject).forEach((catId) => {
            User.find({ _id: userId, category: catId })
            .then((result)=>{
                console.log(result)
                if (result) {
            User.findById(userId).category.splice(User.find({ _id: userId}).category.indexOf(catId), 1);
          } else {
            User.findById(userId).category.push(catId);
          }
            })
          
        })
        .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
      })

      

//edit category
router.route("/categories/:id/edit").get((req, res) => {
  const { id } = req.params;

  Category.findById(id).then((category) => {
    res.render("categories");
  });
});

module.exports = router;
