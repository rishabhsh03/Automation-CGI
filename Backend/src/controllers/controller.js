const db = require("../db/connection");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const getUsers = async (req, res) => {
    try{
    const result = await db.query(
       "SELECT * FROM users"
    );

    res.status(200).json({
         success: true,
         data: result.rows,   
        });
    } catch(error){
        console.error(error);
    
    res.status(500).json({
        success:false,
        message:"INTERNAL SERVER ERROR",
    })
  } 
};

module.exports = {
    getUsers
}