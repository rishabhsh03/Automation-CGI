const express = require("express");
const fs = require("fs");
const path = require("path");
const Router = express.Router();

fs.readdirSync(__dirname)
.filter((file) =>
file !== "index.js" && file.endsWith(".js")
)
.forEach((file) => {
    const routeName = file.replace("Routes.js","").toLowercase();
    const route = require (path.join(__dirname,file));
})
