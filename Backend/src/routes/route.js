const express = require("express");

const router = express.Router();

router.get('/test', (req , res) => {
    res.status(200).json({
        message: "API is working"
    });
});
router.get('/instagram', (req , res) =>{
    res.status(200).json({
        message: "Welcome to Instagram"
    });
});

module.exports = router;