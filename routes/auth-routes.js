//1 import packages and User model
const { Router } = require("express");
const router = new Router();

const bcrypt = require("bcrypt");
const saltRounds = 5;

const User = require("../models/User.model");
const res = require("express/lib/response");

const isLoggedIn = require("../middleware/isLoggedIn")
// const isNotLoggedIn = require('./../middleware/isNotLoggedIn')


        // router.route("/signup")
        // .get((req, res)=> {
        //     res.render("signup")
        // })

router
  .route("/signup")
  .get((req, res) => res.render("signup"))
  
  .post((req, res, next) => {
   
    const { name, email, password } = req.body;

    if (!name || !email || !password){
      res.render("login", {errorMessage: "All fields required"})
      return
    }
    
    const regex = / (?=.*\d) (?=.*[a-z]) (?=.*[A-Z]).{6,} /
    if(regex.test(password)){
      res.render("login", {errorMessage: "Password must follow guidelines"})
    }

    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
          return User.create({
              // username: username
              name,
              email,
              // passwordHash => this is the key from the User model
              //     ^
              //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
              password: hashedPassword,
            });
        })
        .then((userFromDB) => {
          console.log("Newly created user is: ", userFromDB);
          req.session.currentUser = userFromDB;
        res.redirect("/categories");
      })
      .catch((err) =>
        res.render("signup", { errorMessage: `Database error: ${err.message}` })
      )
      .catch((error) => next(error));
  });



router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post((req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        console.log(">>>>>>>>>>>", user, email, password)
        if (!user) {
          res.render("login", { errorMessage: "Wrong credentials!" });
          return;
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect("/"); // redirect to wherever you want
            return;
          } else {
            res.render("login", { errorMessage: "Wrong credentials!" });
          }
        }
      })
      .catch((err) => console.log(err));
  });
  

  router.get('/logout', isLoggedIn, (req, res, ) => {
    req.session.destroy((err) => {
      if (err) {
        res.render('error', { message: 'Something went wrong! Yikes!' });
      } else {
        res.redirect('/login');
      }
    });
  });


module.exports = router;
