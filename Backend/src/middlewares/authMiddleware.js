const authenticate = (req, res, next) => {

    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
        console.log("No Authorization Header");

        return res.status(401).json({
            success: false,
            message: "Access token missing"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

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