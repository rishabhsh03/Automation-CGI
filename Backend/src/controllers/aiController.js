const aiService = require("../ai/services/aiService");

const chat = async (req, res) => {

    try {

        const {
            prompt,
            sessionId = "default"
        } = req.body;

        if (!prompt || !prompt.trim()) {

            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });

        }

        const result =
            await aiService.processMessage(
                prompt,
                sessionId
            );

        return res.json(result);

    } catch (error) {

        console.error(
            "[AI Controller Error]",
            error
        );

        return res.status(500).json({
            success: false,
            message: "AI request failed"
        });

    }

};

module.exports = {
    chat
};