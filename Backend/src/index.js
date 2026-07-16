const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashBoardRoutes");

app.use(express.json());

const router = require("./routes/route");

app.use("/api", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;