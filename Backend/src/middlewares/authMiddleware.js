const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("No Authorization Header");

        return res.status(401).json({
            success: false,
            message: "Access token missing"
        });
    }

    // Make sure header is: Bearer <token>
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        console.log("Invalid Authorization format");

        return res.status(401).json({
            success: false,
            message: "Invalid Authorization format"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Authenticated user:", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT Verify Error:", err.message);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authenticate;