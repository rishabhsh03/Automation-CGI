const db = require("../models/db");

const createPayment = async(data) => {
    const result = await db.query(`
        INSERT INTO payments(
            order_id,
            provider,
            provider_order_id,
            amount,
            currency,
            status
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `,
        [
            data.order_id,
            data.provider || "RAZORPAY",
            data.provider_order_id,
            data.amount,
            data.currency || "INR",
            data.status || "PENDING"
        ]
        );
        return result.rows[0];
}
const getPaymentByOrderId = async(orderId) =>{
    const result = await db.query(
        `
        SELECT * FROM payments
        WHERE order_id = $1
        ORDER BYid DESC
        LIMIT 1;
        `,
        [orderId]
    );
    return result.rows[0] || null;
}

const getPaymentByProviderOrderId = async(providerOrderId) =>{
    const result = await db.query(
        `
        SELECT * FROM payemnts
        WHERE provider_order_id = $1
        LIMIT 1
        `,
        [providerOrderId]
    );
    return result.rows[0] || null
}
const markedPaymentPaid = async (
    providerOrderId,
    providerPayemntId,
    payemntMethod = null
) => {
    const result = await db.query(`
            UPDATE payments
            SET
                provider_payment_id =$1,
                payemnt_method = $2,
                status = 'PAID',
                updated_at = CURRENT_TIMESTAMP

        WHERE provider_order_id = $3

        RETURNING *
        `,
        [   
            providerOrderId,
            providerPayemntId,
            payemntMethod
        ]
        );
        return result.rows[0] || null
}
const updatePaymentStatus = async(
    providerOrderId,
    status
) => {
    const result = await db.query(
        `
        UPDATE payemnts
        SET
        status=$1
        update_at =CURRENT_TIMESTAMP

        WHERE provider_order_id = $2
        RETURNING *
        `,
        [
            providerOrderId,
            status
        ]
    );
    return result.rows[0] || null 
};

module.exports = {

    createPayment,

    getPaymentByOrderId,

    getPaymentByProviderOrderId,

    markedPaymentPaid,

    updatePaymentStatus

};