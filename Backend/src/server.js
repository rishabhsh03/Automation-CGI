require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const db = require("./models/db");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || 8000;

app.get("/api-users", (req,res) => {
  res.json({message: "hello, API"});
})

app.get("/welcomepage", (req, res) => {
  res.send("Hi! Server is listening");
});

// Register routes
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});