const express = require("express");

const router = express.Router();

const {
    getReportSummary,
    getMonthlySales,
} = require("../controllers/reportController");

router.get("/summary", getReportSummary);
router.get("/monthly-sales", getMonthlySales);
module.exports = router;