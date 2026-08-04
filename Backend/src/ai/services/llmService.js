const SYSTEM_PROMPT =
    require("../prompts/systemPrompt");

class LLMService {

    // ==========================================
    // GENERIC LLM REQUEST
    // ==========================================

    async generate(
        messages,
        options = {}    ) {

        try {

            const response = await fetch(
               "http://127.0.0.1:11434/api/chat" ,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        model:
                            options.model ||
                            "qwen3:4b",

                        stream: false,

                        format:
                            options.format,

                        messages,

                        options: {
                            temperature:
                                options.temperature ?? 0
                        }

                    })

                }
            );


            if (!response.ok) {

                throw new Error(
                    `Ollama request failed: ${response.status}`
                );

            }


            const result =
                await response.json();


            if (!result.message?.content) {

                throw new Error(
                    "Ollama returned an empty response"
                );

            }


            return result.message.content;


        } catch (error) {

            console.error(
                "[LLM Generate Error]:",
                error.message
            );

            throw error;

        }

    }


    // ==========================================
    // INTENT + ENTITY ANALYSIS
    // ==========================================

    async analyzeMessage(message) {

        try {

            const content =
                await this.generate(
                    [
                        {
                            role: "system",
                            content:
                                SYSTEM_PROMPT
                        },

                        {
                            role: "user",
                            content:
                                message
                        }
                    ],
                    {
                        format: "json",
                        temperature: 0
                    }
                );


            console.log(
                "[Ollama Raw Response]:",
                content
            );


            return JSON.parse(content);


        } catch (error) {

            console.error(
                "[LLM Analysis Error]:",
                error.message
            );

            throw error;

        }

    }

}


module.exports =
    new LLMService();
