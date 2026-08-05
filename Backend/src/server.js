require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./models/db");

const routes = require("./routes");

app.use("/api", routes);
const paymentRoutes =
    require("./routes/paymentRoutes");

app.use(
    "/api/payments",
    paymentRoutes
);
const PORT = process.env.PORT || 8000;
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});