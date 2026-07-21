const createPurchaseOrder = async (puchaseOrderData) => {
    const result = await db.connect();
    
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
                total_amount
                )
                VALUES(
                    $1,$2,$3,$4
                )
                RETURNING *;
            
            `,
            [
                supplier_id,
                status,
                organization_id,
                total_amount
            ]
        );
        const purchaseOrder = purchaseOrderResult.rows[0];
        
        //Insert purchaseOrderItems
        for(const item in items){
            await client.query()
        }
    }
}