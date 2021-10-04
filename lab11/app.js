//I pledge my honor that I have abided by the Stevens Honor System.
const express = require("express");
const app = express();
const configRoutes = require('./routes');
const static=express.static(__dirname+'/public');
app.use('/public',static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});