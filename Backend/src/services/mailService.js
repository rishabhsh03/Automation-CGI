const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    service:"gmail",
        
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        
    }
        
});
transport.verify((error, success) => {

    if (error) {

        console.error("MAIL ERROR:", error);

    } else {

        console.log("Mail Server Ready");

    }

});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
module.exports = transport;