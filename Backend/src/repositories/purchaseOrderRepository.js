const db = require("../models/db");
const createPurchaseOrder = async (purchaseOrderData) => {
    
        const client = await db.connect();
    try{
        await client.query("BEGIN");

        const {
            supplier_id,
            status,
            organization_id,
            total_amount,
            items
        } = purchaseOrderData;

        // create Purchase Order
        const purchaseOrderResult = await client.query(`
                INSERT INTO purchaseorders(
                supplier_id,
                status,
                organization_id,
                total_amount,
                created_at,
                received_at
                )
                VALUES(
                    $1,$2,$3,$4,$5,$6,$7
                )
                RETURNING *;
            
            `,
            [
                supplier_id,
                status,
                organization_id,
                total_amount,
                created_at,
                received_at
            ]
        );
        const purchaseOrder = purchaseOrderResult.rows[0];
        
        //Insert purchaseOrderItems
        for(const item of items){
            await client.query(`
                INSERT INTO purchaseorderitems(
                    purchase_order_id,
                    product_id,
                    quantity,
                    unit_cost,
                    subtotal
                )
                VALUES(
                $1,$2,$3,$4,$5
                )
                RETURNING *
                `,
                [
                purchaseOrder.id,
                item.product_id,
                item.quantity,
                item.unit_cost,
                item.subtotal
                ]
            );

        }
        await client.query("COMMIT");

        return purchaseOrder;
    }catch(error){
        await client.query("ROLLBACK");
        throw error;        
    }finally{
        client.release();
    }
};

const getPurchaseOrders = async() => {

    const result = await db.query(`
        SELECT 
        po.id,
        s.name AS supplier,
        po.status,
        po.total_amount,
        po.created_at
    FROM purchaseorders po
    
    JOIN suppliers s
    ON s.id = po.supplier_id,

    ORDER BY po.created_at DESC;
        `);
    
        return result.rows;
};

const getPurchaseOrderById = async (id) => {
    const result = await db.query(`
        SELECT * FROM purchaseorders
        WHERE id = $1; 
        `,
        [id]    
    );
    return result.rows[0];
};

const updatePurchaseOrderStatus = async (id , status) =>{

    const result = await db.query(`
        UPDATE puchaseorders

        SET  status = $1
        WHERE id = $2
        RETURNING *
        `,
        [status , id]    
    );
    return result.rows[0];
};
const cancelPurchaseOrder = async (id) => {

    const result = await db.query(
        `
        UPDATE purchaseorders
        SET status = 'CANCELLED'
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports ={
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrderStatus,
    cancelPurchaseOrder,
}