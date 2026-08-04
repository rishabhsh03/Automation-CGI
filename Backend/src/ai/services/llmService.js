const SYSTEM_PROMPT = require("../prompts/systemPrompt");

class LLMService {

    async analyzeMessage(message) {

        try {

            const response = await fetch(
                "http://localhost:11434/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        model: "qwen3:4b",

                        stream: false,

                        format: "json",

                        messages: [
                            {
                                role: "system",
                                content: SYSTEM_PROMPT
                            },
                            {
                                role: "user",
                                content: message
                            }
                        ],

                        options: {
                            temperature: 0
                        }
                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    `Ollama request failed: ${response.status}`
                );

            }


            const result = await response.json();


            console.log(
                "[Ollama Raw Response]:",
                result.message?.content
            );


            if (!result.message?.content) {

                throw new Error(
                    "Ollama returned an empty response"
                );

            }


            const analysis =
                JSON.parse(result.message.content);


            return analysis;

        } catch (error) {

            console.error(
                "[LLM Service Error]:",
                error.message
            );

            throw error;

        }

    }

}


module.exports = new LLMService();