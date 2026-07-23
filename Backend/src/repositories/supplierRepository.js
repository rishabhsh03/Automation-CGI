const db = require("../models/db");
const getSuppliers = async () => {

    const result = await db.query(`
        SELECT
    id,
    name,
    contact_person,
    email,
    phone,
    city,
    address,
    avg_delivery_date,
    status,
    organization_id
FROM suppliers
ORDER BY name;
    `);

    return result.rows;

};
const getSupplierById = async (id) => {
    const result = await db.query(`
        SELECT * FROM suppliers
        WHERE id = $1;
        `,
        [id]
    ); 
}

const addSupplier = async (supplierData) => {
    const {
        name,
        contact_person,
        email,
        phone,
        city,
        address,
        avg_delivery_date,
        status,
        organization_id
    } = supplierData;

    const rsult = db.query(`
        INSERT INTO suppliers
        (
            name,
            contact_person,
            email,
            phone,
            city,
            address,
            avg_delivery_date,
            status,
            organization_id
        )
        VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
        `,
            [
                name,
                contact_person,
                email,
                phone,
                city,
                address,
                avg_delivery_date,
                status,
                organization_id
            ]
        );
        return  result.rows[0];
};

const updateSupplier = async (id, supplierData) => {
    const {
        name,
        contact_person,
        email,
        phone,
        city,
        address,
        avg_delivery_date,
        status,
    } = supplierData;

    const result = await db.query(`
        UPDATE suplliers
        SET
            name = $1,
            contact_person = $2,
            email = $3,
            phone = $4,
            city = $5,
            address = $6,
            avg_delivery_date = $7,
            status = $8,
        WHERE id = $9
        RETURNING *;    
        `,
        [
            name,
            contact_person,
            email,
            phone,
            city,
            city,
            address,
            avg_delivery_date,
            status,
            id
        ]
    );
    return result.rows[0];
}
const deleteSuppliers = async (id) => {
    const rsult = await db.query(`
        DELETE FROM suppliers
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    )
    return result.rows[0];
}

module.exports = {
    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSuppliers
}