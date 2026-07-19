const express = require("express");
const router = express.Router();

const { getDashboard,
        getPurchaseSales,
 } = require("../controllers/dashboardController");

router.get("/", getDashboard);
router.get("/purchase-sales", getPurchaseSales);
module.exports = router;