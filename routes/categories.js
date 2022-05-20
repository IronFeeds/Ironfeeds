const express = require("express");
const Category = require("../models/Category.model");
const User = require("../models/User.model");

const Handlebars = require("handlebars");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")

//choose categories
router
  .route("/categories")
  .get(isLoggedIn, (req, res) => {
    async function catuser() {
      const categories = await Category.find();
      const user = await User.findOne({ _id: req.session.currentUser._id });
      const userCategories = user.category;
      const categoriesWithChecked = categories.map((category) => {
        const checked = userCategories.some((userCategory) => {
          return userCategory.equals(category._id);
        });
        return {
          _id: category._id,
          name: category.name,
          checked: checked,
        };
      });
      res.render("categories", { categories: categoriesWithChecked });
    }
    catuser();
  })

  .post(isLoggedIn, (req, res) => {
    console.log(">>>>>>>>>>>>>>", req.body);
    const userId = req.session.currentUser._id;
    const categoryIds = Object.values(req.body);
    User.findByIdAndUpdate(userId, { category: categoryIds }, { new: true })
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });


module.exports = router;
