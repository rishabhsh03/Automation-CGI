function extractEntities(message) {

    const entities = {
        product: null,
        category: null,
        supplier: null,
        quantity: null
    };

    const text = message.toLowerCase();

    // ---------- Quantity ----------
    const quantityMatch = text.match(/\d+/);

    if (quantityMatch) {
        entities.quantity = Number(quantityMatch[0]);
    }

    // ---------- Product ----------
    const productPatterns = [
        /rtx\s?\d{3,4}/i,
        /gtx\s?\d{3,4}/i,
        /ryzen\s?\d/i,
        /intel\s?i[3579]/i,
        /ssd/i,
        /hdd/i,
        /ram/i,
        /motherboard/i,
        /keyboard/i,
        /mouse/i,
        /monitor/i
    ];

    for (const pattern of productPatterns) {

        const match = message.match(pattern);

        if (match) {
            entities.product = match[0];
            break;
        }

    }

    // ---------- Category ----------

    const categories = [
        "gpu",
        "cpu",
        "ram",
        "ssd",
        "hdd",
        "keyboard",
        "mouse",
        "monitor"
    ];

    for (const category of categories) {

        if (text.includes(category)) {
            entities.category = category;
            break;
        }

    }

    return entities;

}

module.exports = extractEntities;