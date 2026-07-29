const aiService = require("../services/aiService");
const conversationStore = require("../storage/conversationStore");
const SYSTEM_PROMPT = require("../config/aiPrompt");

const intentAnalyzer = require("../ai/intentAnalyzer");
const dispatcher = require("../ai/toolDispatcher");


const chat = async (req, res) => {
    try {

        const { sessionId, prompt } = req.body;

        const analysis = intentAnalyzer.analyze(prompt);

        console.log("Intent Analysis:", analysis);

        const tool = dispatcher[analysis.intent];

        // -------------------------
        // Tool-based requests
        // -------------------------
        if (tool) {

            const result = await tool.execute(analysis);
          if (!result || result.length === 0) {

    let message = "No matching records found.";

    switch (analysis.intent) {

        case "LOW_STOCK":
            message = "There are no low stock products.";
            break;

        case "OUT_OF_STOCK":
            message = "There are no out-of-stock products.";
            break;

        case "SEARCH_PRODUCT":
            message = `No product found matching "${analysis.entities.product}".`;
            break;
    }

    return res.json({
        success: true,
        response: message
    });
}
            const messages = [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `
User Request:
${prompt}

Database Result:
${JSON.stringify(result, null, 2)}

Instructions:
- Use ONLY the database result.
- Never print raw JSON.
- Format the response professionally.
- Use bullet points whenever appropriate.
- If the result is empty, politely inform the user.
`
                }
            ];

            const answer = await aiService.chat(messages);
            conversationStore.addMessage(sessionId, "user", prompt);
            conversationStore.addMessage(sessionId, "assistant", answer);
            return res.json({
                success: true,
                response: answer
            });
        }

        // -------------------------
        // General conversation
        // -------------------------

        const history = conversationStore.getMessages(sessionId);

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
        const answer = await aiService.chat(messages);

        conversationStore.addMessage(sessionId, "user", prompt);
        conversationStore.addMessage(sessionId, "assistant", answer);

        return res.json({
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