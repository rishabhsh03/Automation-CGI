const aiService = require("../ai/services/aiService");

const chat = async (req, res) => {

    try {

        const { prompt } = req.body;

        const result =
            await aiService.processMessage(prompt);

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

module.exports = { chat };