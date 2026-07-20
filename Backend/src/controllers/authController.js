const authService = require("../services/authService");

const register = async (req, res) => {

    console.log("REGISTER BODY:", req.body);

    try {

        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            data: user,
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const login = async (req, res) => {

    console.log("BODY =>", req.body);

    try {

        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            token: result.token,
            user: result.user,
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        await authService.forgotPassword(req.body.email);

        res.json({
            success: true,
            message: "OTP sent",
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    register,
    login,
    forgotPassword,
};