const express = require("express");
const Category = require("../models/Category.model");
const User = require("../models/User.model");

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
    const categoryIds = Object.values(req.body);
    User.findByIdAndUpdate(userId, { category: categoryIds }, { new: true })
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
