const express = require('express');
const router = express.Router();


router.route("/categories")
.get((req, res)=> {
    res.render("categories")
})



module.exports = router;