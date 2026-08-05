const paymentService =
    require("../services/paymentService");


const createPayment = async (
    req,
    res
) => {

    try {

        const {
            order_id,
            amount
        } = req.body;


        const result =
            await paymentService
                .createPaymentOrder({
                    order_id,
                    amount
                });


        return res.status(201).json({

            success: true,

            message:
                "Payment order created",

            data: result

        });


    } catch (error) {

    console.error(
        "[Create Payment Error FULL]",
        error
    );

    return res.status(500).json({
        success: false,
        message:
            error?.error?.description ||
            error?.description ||
            error?.message ||
            "Unable to create payment",

        details:
            error?.error || null
    });
}
    };

// ==========================================
// VERIFY PAYMENT
// ==========================================

const verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        const result =
            await paymentService.verifyPayment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });


        return res.status(200).json({
            success: true,
            message:
                "Payment verified successfully",
            data: result
        });


    } catch (error) {

        console.error(
            "[Verify Payment Error]",
            error
        );


        return res.status(400).json({
            success: false,
            message:
                error.message ||
                "Payment verification failed"
        });

    }

};
module.exports = {

    createPayment,
    verifyPayment

};