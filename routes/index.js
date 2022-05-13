const axios = require('axios')

const router = require('express').Router();
const API = "http://api.mediastack.com/v1/news?access_key=" + process.env.API_KEY

router.get("/", (req, res)=>

{   
    axios.get(API)
      .then(response => {
          console.log("API data", Object.values(response.data.data))
          res.render("index", {name:response.data.data})})
        
}
)
module.exports = router;
