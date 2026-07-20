const express = require("express");

const app = express();

const productRoutes = require("./routes/productsRoutes");
const dashboardRoutes = require("./routes/dashBoardRoutes");
const authRoutes = require("./routes/authRoutes")
app.use(express.json());

const router = require("./routes/route");

app.use("/api", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", authRoutes);
app.use
module.exports = app;