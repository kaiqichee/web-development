//I pledge my honor that I have abided by the Stevens Honor System.
const express = require("express");
const app = express();
const configRoutes = require("./routes");

configRoutes(app);

app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});