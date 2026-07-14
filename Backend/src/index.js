const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");


app.use(express.json());

const router = require("./routes/route");

app.use("/api", productRoutes);

module.exports = app;