const llmService =
    require("../services/llmService");


class LanguageDetector {

    async detect(text) {

        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (
            !text ||
            typeof text !== "string" ||
            !text.trim()
        ) {

            return {
                language: "en",
                name: "English",
                confidence: 1
            };

        }


        // ------------------------------------------
        // ASK LLM
        // ------------------------------------------

        const prompt = `
Detect the language of the following user message.

Return ONLY valid JSON.

Format:

{
    "language": "ISO-639-1 language code",
    "name": "language name",
    "confidence": number between 0 and 1
}

Rules:

- Detect mixed-language text too.
- Hinglish should return "hi".
- Preserve English technical terms when determining the main language.
- Do not explain anything.
- Do not use markdown.
- Return JSON only.

Message:
${JSON.stringify(text)}
`;


        try {

            const result =
                await llmService.chat(prompt);

            const cleaned =
                result
                    .replace(/```json/gi, "")
                    .replace(/```/g, "")
                    .trim();

            const parsed =
                JSON.parse(cleaned);


            return {

                language:
                    parsed.language || "en",

                name:
                    parsed.name || "English",

                confidence:
                    Number(
                        parsed.confidence ?? 0
                    )

            };

        } catch (error) {

            console.error(
                "[LanguageDetector]",
                error.message
            );


            // Detection should NEVER break AI chat.

            return {
                language: "en",
                name: "English",
                confidence: 0
            };

        }

    }

}


module.exports =
    new LanguageDetector();