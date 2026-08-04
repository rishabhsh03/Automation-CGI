const KEYWORDS = require("./keywords");
const INTENTS = require("./intents");

function normalizeMessage(message) {
    return message
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, " ")
        .replace(/\s+/g, " ");
}

function escapeRegex(text) {
    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
}

function containsKeyword(message, keyword) {

    const normalizedKeyword = keyword
        .toLowerCase()
        .trim();

    const escapedKeyword =
        escapeRegex(normalizedKeyword);

    const pattern = new RegExp(
        `\\b${escapedKeyword}\\b`,
        "i"
    );

    return pattern.test(message);
}

function analyzeIntent(message) {

    const normalizedMessage =
        normalizeMessage(message);
    // ==========================================
// STOCK QUERY FALLBACK
// ==========================================

const stockWords = [
    "stock",
    "stocks"
];

const hasStockWord =
    stockWords.some(word =>
        containsKeyword(
            normalizedMessage,
            word
        )
    );
    const matches = [];

    for (const [intent, config] of Object.entries(KEYWORDS)) {

        const keywords = config.keywords || [];

        let score = 0;
        let specificity = 0;

        const matchedKeywords = [];

        for (const keyword of keywords) {

            if (
                containsKeyword(
                    normalizedMessage,
                    keyword
                )
            ) {

                score++;

                specificity +=
                    keyword.length;

                matchedKeywords.push(keyword);
            }
        }

        if (score > 0) {

            matches.push({
                intent,
                score,
                specificity,
                matchedKeywords
            });
        }
    }

    matches.sort((a, b) => {

        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return b.specificity - a.specificity;
    });

    if (matches.length === 0) {
        // ==========================================
// GENERIC STOCK REQUEST
// ==========================================

if (
    matches.length === 0 &&
    hasStockWord
) {

    return {
        intent: INTENTS.AVAILABLE_STOCK,
        score: 1,
        specificity: 5,
        matchedKeywords: ["stock"]
    };

}
        return {
            intent: INTENTS.UNKNOWN,
            score: 0,
            specificity: 0,
            matchedKeywords: []
        };
    }

    return matches[0];
}

module.exports = analyzeIntent;
