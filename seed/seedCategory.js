require("dotenv/config")
require('../db/index')

const mongoose = require('mongoose');

const Category = require("../models/Category.model")

Category.deleteMany()
.then(()=>
Category.create([
    {name: "general"},
    {name: "business"},
    {name: "entertainment"},
    {name: "health"},
    {name: "science"},
    {name: "sports"}
]))
.then(()=>{
    console.log(`${Category.length} categories successfully created`)
  mongoose.connection.close()})
  .catch(()=>console.log("couldn't add the drones"))