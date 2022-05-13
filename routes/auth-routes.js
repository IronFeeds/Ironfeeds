//1 import packages and User model
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || 10;



const isNotLoggedIn = require('./../middleware/isNotLoggedIn')

router.route("/login")
.get((req, res)=> {
    res.render("login")
})

router.route("/signup")
.get((req, res)=> {
    res.render("signup")
})



module.exports = router;
