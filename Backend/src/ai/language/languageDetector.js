const llmService =
    require("../services/llmService");


class LanguageDetector {

    async detect(text) {

        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !text ||
            typeof text !== "string" ||
            !text.trim()
        ) {

            return {
                code: "en",
                language: "English",
                confidence: 1
            };

        }


        try {

            // ==========================================
            // LANGUAGE DETECTION
            // ==========================================

            const content =
                await llmService.generate(
                    [
                        {
                            role: "system",

                            content: `
You are a language detection system.

Detect the primary language of the user's message.

Return ONLY valid JSON.

Required format:

{
    "code": "ISO-639-1 code",
    "language": "Language name",
    "confidence": 0.98
}

Rules:

1. Return JSON only.
2. Do not explain your answer.
3. Use ISO-639-1 language codes when available.
4. Detect mixed-language messages.
5. Hindi written using Latin characters (Hinglish)
   should be detected as Hindi ("hi").
6. Technical words should NOT determine the language.

Examples of technical words:

GPU
CPU
RAM
SSD
RTX
AMD
Intel
SKU
warehouse
stock
inventory
order

Examples:

"show GPU stock"

{
    "code": "en",
    "language": "English",
    "confidence": 0.99
}

"GPU ka stock dikhao"

{
    "code": "hi",
    "language": "Hindi",
    "confidence": 0.95
}

"GPU का stock दिखाओ"

{
    "code": "hi",
    "language": "Hindi",
    "confidence": 0.99
}
`
                        },

                        {
                            role: "user",
                            content: text
                        }
                    ],

                    {
                        format: "json",
                        temperature: 0
                    }
                );


            // ==========================================
            // PARSE RESPONSE
            // ==========================================

            const result =
                JSON.parse(content);


            return {

                code:
                    result.code || "en",

                language:
                    result.language || "English",

                confidence:
                    Number(
                        result.confidence ?? 0
                    )

            };


        } catch (error) {

            console.error(
                "[Language Detector Error]:",
                error.message
            );


            // Language detection should never
            // crash Warehouse AI.

            return {

                code: "en",

                language: "English",

                confidence: 0

            };

        }

    }

}


module.exports =
    new LanguageDetector();