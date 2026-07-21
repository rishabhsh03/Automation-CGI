const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const files = fs.readdirSync(__dirname);

files
    .filter(file => file !== "index.js" && file.endsWith("Routes.js"))
    .forEach(file => {

        const route = require(path.join(__dirname, file));

        router.use(
            `/${file.replace("Routes.js", "").toLowerCase()}`,
            route
        );

    });

module.exports = router;