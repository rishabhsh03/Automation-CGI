const INTENTS = require("./intents");
const keywords = require("./keywords");
const entityExtractor = require("./entityExtractor");

class IntentAnalyzer {

    analyze(prompt) {

        const text = prompt.toLowerCase();

        // Step 1: Detect predefined intents
        for (const [intent, words] of Object.entries(keywords)) {

            if (words.some(word => text.includes(word))) {

                return {
                    intent,
                    confidence: 1,
                    entities: {}
                };

            }

        }

        // Step 2: Product search
        const match = prompt.match(/^(find|search|show)\s+(.+)$/i);

        if (match) {
            const entities = entityExtractor.extract(prompt, intent);

return {
    intent,
    confidence: 1,
    entities
};

            return {
                intent: INTENTS.SEARCH_PRODUCT,
                confidence: 1,
                entities: {
                    product: match[2].trim()
                }
            };

        }

        return {
            intent: INTENTS.GENERAL,
            confidence: 0,
            entities: {}
        };

    }

}

module.exports = new IntentAnalyzer();