const aiService = require("../services/aiService");
const conversationStore = require("../storage/conversationStore");
const SYSTEM_PROMPT = require("../config/aiPrompt");
const intentAnalyzer = require("../ai/intentAnalyzer");
const inventoryTool = require("../ai/tools/inventoryTool");
const chat = async (req, res) => {
    try {

        const { sessionId, prompt } = req.body;
        const result = intentAnalyzer.analyze(prompt);
        if (!sessionId || !prompt) {
            return res.status(400).json({
                success: false,
                message: "sessionId and prompt are required"
            });
        }

        // Get previous conversation
        const history = conversationStore.getMessages(sessionId);

        // Build the complete conversation
        const messages = [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },

            ...history,

            {
                role: "user",
                content: prompt
            }
        ];

        // Ask Ollama
        const answer = await aiService.chat(messages);

        // Save conversation
        conversationStore.addMessage(sessionId, "user", prompt);
        conversationStore.addMessage(sessionId, "assistant", answer);

        res.json({
            success: true,
            response: answer
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    chat
};