const db = require("../models/db");

require("dotenv").config();

const saveProducts = async (req , res) => {
     console.log("req.body =", req.body);
    
        const {
            sku,
            name,
            category,
            reorder_threshold,
            reorder_qty
        } = req.body; 

         console.log({
        sku,
        name,
        category,
        reorder_threshold,
        reorder_qty
    });
        try{
         await db.query(
            `INSERT INTO products
            (sku, name, category, reorder_threshold, reorder_qty)
            VALUES($1, $2, $3, $4, $5)`,
            [sku, name, category, reorder_threshold, reorder_qty]
        );    
        res.status(200).json({
            message:"Product created sucessfully"
        });   
    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        });
    }
};
const getProducts = async (req , res) => {
    try{
        const result = await db.query("SELECT * FROM products ORDER BY id");
        res.status(200).json({
            success: true,
            data:result.rows
        })
    }catch(error){
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"INERNAL SERVER ERROR"
        })
    }
}
const updateProducts = async (req , res) => {
    try{
        const {id} = req.params;
        const {sku, name, category, reorder_threshold, reorder_qty} =req.body;

        await db.query(`
            UPDATE products
            SET sku = $1, name = $2, category = $3, reorder_threshold = $4, reorder_qty = $5 
            WHERE id = $6`,
        [sku, name, category, reorder_threshold, reorder_qty, id]
    );
    res.status(200).json({
        success: true,
        message:"PRODUCT UPDATED SUCCESSFULLY"
    })
    }catch(error){
        console.log(error);
    }
    res.status(500).json({
        success:false,
        message:"INTERNAL SERVER ERROR"
    })
}
const deleteProducts = async(req , res) => {
    console.log("Inside function");
    try{
        const{id} = req.params;
        console.log("id:", id);
        const result = await db.query(`
            DELETE FROM products
            WHERE id = $1`,
        [id]);
        console.log(result);

        res.status(200).json({
            success:true,
            message:"PRODUCT DELETED SUCCESSFULLY"
        })
    }catch(error){
        console.log(error);
    }
    res.status(500).json({
        success:false,
        message:"INTERNAL SERVER ERROR"
    })
};
module.exports = {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
}