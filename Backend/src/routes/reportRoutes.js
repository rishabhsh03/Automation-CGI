const express = require("express");

const router = express.Router();

const {
    getReportSummary,
    getMonthlySales,
    generateReport,
} = require("../controllers/reportController");

router.get("/summary", getReportSummary);
router.get("/monthly-sales", getMonthlySales);
router.post("/", generateReport);
module.exports = router;