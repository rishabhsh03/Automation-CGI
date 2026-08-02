const KEYWORDS = require("./keywords");
const INTENTS = require("./intents");

function normalizeMessage(message) {
    return message
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "");
}

function analyzeIntent(message) {

    const normalizedMessage = normalizeMessage(message);

    const matches = [];

    for (const [intent, config] of Object.entries(KEYWORDS)) {

        const keywords = config.keywords || config;

        let score = 0;
        const matchedKeywords = [];

        for (const keyword of keywords) {

            if (normalizedMessage.includes(keyword.toLowerCase())) {
                score++;
                matchedKeywords.push(keyword);
            }

        }

        if (score > 0) {
            matches.push({
                intent,
                score,
                matchedKeywords
            });
        }

    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {

        return {
            intent: INTENTS.UNKNOWN,
            score: 0,
            matchedKeywords: []
        };

    }

    return matches[0];

}

module.exports = analyzeIntent;