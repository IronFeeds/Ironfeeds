require("dotenv/config")
require('../db/index')

const mongoose = require('mongoose');

const Category = require("../models/Category.model")

Category.deleteMany()
.then(()=>
Category.create([
    {name: "general", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/general_1_wo54ep.jpg", 
    imageNotSelected: "https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/generalBlack_phefr3.jpg"},
    {name: "business", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/bussiness1_j34pbe.jpg", 
    imageNotSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/bussinessBlack_sundgf.jpg"},
    {name: "entertainment", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/enntreteniment1_plqgv8.jpg", 
    imageNotSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977429/Ironfeeds/enntretenimentBlack_xicmdj.jpg"},
    {name: "health", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/Health_1_uoomdb.jpg", 
    imageNotSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/HealthBlack_t3dc6b.jpg"},
    {name: "science", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/science_1_ypzbzz.jpg",
    imageNotSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/scienceBlack_ggsndj.jpg"},
    {name: "sports", 
    imageSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/sports_ft47xr.jpg",
    imageNotSelected:"https://res.cloudinary.com/dz2hyfmhw/image/upload/v1652977428/Ironfeeds/sportsBlack_hq1m2t.jpg"}
]))
.then(()=>{
    console.log(`${Category.length} categories successfully created`)
//   mongoose.connection.close()
})
  .catch((err)=>console.log("couldn't add the categories", err))