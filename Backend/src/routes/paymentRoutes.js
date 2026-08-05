const express = require("express");

const paymentController =
    require("../controllers/paymentController");

const router = express.Router();




router.get(
    "/test",
    (req, res) => {

        res.json({
            success: true,
            message: "Payment routes are working"
        });

    }
);




router.post(
    "/create",
    paymentController.createPayment
);



router.post(
    "/verify",
    paymentController.verifyPayment
);


module.exports = router;