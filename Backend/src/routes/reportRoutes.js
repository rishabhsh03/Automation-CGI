const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/summary", reportController.getReportSummary);

router.get("/monthly-sales", reportController.getMonthlySales);

router.post("/", reportController.generateReport);

module.exports = router;