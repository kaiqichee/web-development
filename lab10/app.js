//I pledge my honor that I have abided by the Stevens Honor System.
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const session = require('express-session')
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

//authentication middleware
app.use('/private', async (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).render('users/login', {error: "You're not logged in, please enter details below :)", title: "Login"});
    } 
    next();
});

//logout middleware
app.use('/logout', async (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).render('users/logout', {message: "You're not logged in!", title:"Logout"});
  } 
  next();
});

//logging middleware
app.use(async (req, res, next) => {
  let date=new Date().toUTCString();
  let reqMeth= req.method;
  let route= req.originalUrl;
  let b=false;
  if(req.session.user){
    b=true;
  }
  console.log(`[${date}]: ${reqMeth} ${route} ${b}`);
  next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});

