const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")
// const isNotLoggedIn = require('./../middleware/isNotLoggedIn')


const fileUploader = require('../config/cloudinary')



module.exports = router;
