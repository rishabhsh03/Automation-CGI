import { useState } from "react";

import {
    createPayment,
    verifyPayment
} from "../../services/paymentService";

import {
    loadRazorpay
} from "../../utils/loadRazorpay";


export default function PayButton({
    orderId,
    amount,
    customerName,
    onSuccess
}) {

    const [loading, setLoading] =
        useState(false);


    const handlePayment = async () => {

        try {

            setLoading(true);

            // Load Razorpay checkout
            const loaded =
                await loadRazorpay();

            if (!loaded) {
                throw new Error(
                    "Razorpay failed to load"
                );
            }


            // Create Razorpay order from backend
            const result =
                await createPayment(
                    orderId,
                    amount
                );


            console.log(
                "Payment order:",
                result
            );


            const razorpayOrder =
                result.razorpayOrder;


            const options = {

                key:
                    import.meta.env
                        .VITE_RAZORPAY_KEY_ID,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                name:
                    "Automation CGI",

                description:
                    `Payment for Order #${orderId}`,

                order_id:
                    razorpayOrder.id,

                handler: async (response) => {

                    try {

                        const verification =
                            await verifyPayment({

                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature

                            });


                        console.log(
                            "Verified:",
                            verification
                        );

                        alert(
                            "Payment successful!"
                        );
                        if(onSuccess){
                            onSuccess(verification);
                        }

                    } catch (error) {

                        console.error(
                            error
                        );

                        alert(
                            "Payment verification failed"
                        );

                    }

                },

                prefill: {
                    name:
                        customerName || ""
                }

            };


            const razorpay =
                new window.Razorpay(
                    options
                );


            razorpay.open();


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            alert(
                error.message
            );


        } finally {

            setLoading(false);

        }

    };

return (
    <button
        type="button"
        className="order-pay-btn"
        onClick={handlePayment}
        disabled={loading}
    >
        {loading ? "..." : "Pay"}
    </button>
);

}