const axios = require("axios");

class AIService {

    async chat(messages) {

        try {

            const response = await axios.post(
                "http://localhost:11434/api/chat",
                {
                    model: "llama3.2",
                    messages,
                    stream: false
                }
            );

            return response.data.message.content;

        } catch (error) {

            console.error("Ollama Error:", error.message);

            throw new Error("Failed to communicate with Ollama");

        }

    }

}

module.exports = new AIService();