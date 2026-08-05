const API_URL =
    "http://localhost:8000/api/payments";

export const createPayment = async (
    orderId,
    amount
) => {

    const response = await fetch(
        `${API_URL}/create`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                order_id: orderId,
                amount
            })
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(
            data.message || "Unable to create payment"
        );
    }

    return data.data;
};


export const verifyPayment = async (
    paymentData
) => {

    const response = await fetch(
        `${API_URL}/verify`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(paymentData)
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(
            data.message ||
            "Payment verification failed"
        );
    }

    return data.data;
};