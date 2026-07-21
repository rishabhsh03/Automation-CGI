// userController.js

const userRepository = require("../repositories/userRepository");

const getUsers = async (req, res) => {

    try {

        const users = await userRepository.getUsers();

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getUsers
};