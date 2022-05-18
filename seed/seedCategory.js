require("dotenv/config")
require('../db/index')

const mongoose = require('mongoose');

const Category = require("../models/Category.model")

Category.deleteMany()
.then(()=>
Category.create([
    {name: "General"},
    {name: "Business"},
    {name: "Entertainment"},
    {name: "Health"},
    {name: "Science"},
    {name: "Sports"}
]))
.then(()=>{
    console.log(`${Category.length} categories successfully created`)
  mongoose.connection.close()})
  .catch(()=>console.log("couldn't add the categories"))