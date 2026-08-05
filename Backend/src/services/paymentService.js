const Razorpay = require("razorpay");
const crypto = require("crypto");

const paymentRepository =
    require("../repositories/paymentRepository");




const razorpay = new Razorpay({

    key_id:
        process.env.RAZORPAY_KEY_ID,

    key_secret:
        process.env.RAZORPAY_KEY_SECRET

});



const createPaymentOrder = async ({
    order_id,
    amount
}) => {



    if (!order_id) {
        throw new Error(
            "Order ID is required"
        );
    }

    if (!amount || Number(amount) <= 0) {
        throw new Error(
            "Valid payment amount is required"
        );
    }




    const amountInPaise =
        Math.round(
            Number(amount) * 100
        );



    const razorpayOrder =
        await razorpay.orders.create({

            amount: amountInPaise,

            currency: "INR",

            receipt:
                `order_${order_id}`,

            notes: {

                warehouse_order_id:
                    String(order_id)

            }

        });


    const payment =
        await paymentRepository.createPayment({

            order_id,

            provider:
                "RAZORPAY",

            provider_order_id:
                razorpayOrder.id,

            amount:
                Number(amount),

            currency:
                razorpayOrder.currency,

            status:
                "PENDING"

        });


    return {

        payment,

        razorpayOrder

    };

};




const verifyPayment = async ({

    razorpay_order_id,

    razorpay_payment_id,

    razorpay_signature

}) => {




    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
    ) {

        throw new Error(
            "Payment verification data is incomplete"
        );

    }




    const existingPayment =
        await paymentRepository
            .getPaymentByProviderOrderId(
                razorpay_order_id
            );


    if (!existingPayment) {

        throw new Error(
            "Payment order not found"
        );

    }



    const body =
        `${razorpay_order_id}|${razorpay_payment_id}`;


    const expectedSignature =
        crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");


    const expectedBuffer =
        Buffer.from(
            expectedSignature,
            "utf8"
        );

    const receivedBuffer =
        Buffer.from(
            razorpay_signature,
            "utf8"
        );


    if (
        expectedBuffer.length !==
        receivedBuffer.length
    ) {

        throw new Error(
            "Invalid payment signature"
        );

    }


    const isValid =
        crypto.timingSafeEqual(
            expectedBuffer,
            receivedBuffer
        );


    if (!isValid) {

        throw new Error(
            "Invalid payment signature"
        );

    }



    const razorpayPayment =
        await razorpay.payments.fetch(
            razorpay_payment_id
        );



    if (
        razorpayPayment.order_id !==
        razorpay_order_id
    ) {

        throw new Error(
            "Payment order mismatch"
        );

    }


    // ------------------------------------------
    // VERIFY AMOUNT
    // ------------------------------------------

    const expectedAmount =
        Math.round(
            Number(
                existingPayment.amount
            ) * 100
        );


    if (
        Number(razorpayPayment.amount) !==
        expectedAmount
    ) {

        throw new Error(
            "Payment amount mismatch"
        );

    }



    if (
        razorpayPayment.currency !==
        existingPayment.currency
    ) {

        throw new Error(
            "Payment currency mismatch"
        );

    }



    const payment =
        await paymentRepository
            .markPaymentPaid(

                razorpay_order_id,

                razorpay_payment_id,

                razorpayPayment.method

            );


    if (!payment) {

        throw new Error(
            "Unable to update payment"
        );

    }


    return {

        verified: true,

        payment

    };

};



module.exports = {

    createPaymentOrder,

    verifyPayment

};