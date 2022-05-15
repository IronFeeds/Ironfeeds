const express = require("express");
const Category = require("../models/Category.model");

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
    console.log(req.body)
    //Category.findOne(req.body)
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });

//edit category
router.route("/categories/:id/edit").get((req, res) => {
  const { id } = req.params;

  Category.findById(id).then((category) => {
    res.render("categories");
  });
});

module.exports = router;
