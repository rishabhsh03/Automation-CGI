const db = require("../db");
const express = require("express");
const router = require.Router();
require("dotenv").config();

const createProduct = async (req , res) => {
    try {
        const {
            sku,
            name,
            category,
            reorder_threshold,
            reorder_qty
        } = req.body; 

         await db.query(
            `INSERT INTO products
            (sku, name, category, reorder_threshold, reorder_qty)
            VALUE($1, $2, $3, $4, $5)`,
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

module.export = {
    createProduct
}