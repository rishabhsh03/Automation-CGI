function extractEntities(message) {

    const entities = {
        product: null,
        category: null,
        supplier: null,
        quantity: null,
        sku: null,
        barcode: null
    };

    const text = message.toLowerCase().trim();


    // ==========================================
    // QUANTITY
    // ==========================================
    // Only treat a number as quantity when the
    // sentence gives quantity context.

    const quantityPatterns = [

        /quantity\s+(?:of\s+)?(\d+)/i,

        /qty\s+(?:of\s+)?(\d+)/i,

        /(\d+)\s+units?/i,

        /(\d+)\s+pieces?/i,

        /(\d+)\s+pcs?/i,

        /add\s+(\d+)/i,

        /remove\s+(\d+)/i,

        /order\s+(\d+)/i
    ];


    for (const pattern of quantityPatterns) {

        const match = message.match(pattern);

        if (match) {

            entities.quantity = Number(match[1]);

            break;
        }
    }


    // ==========================================
    // PRODUCT
    // ==========================================

    const productPatterns = [

        /rtx\s?\d{3,4}(?:\s?(?:ti|super))?/i,

        /gtx\s?\d{3,4}(?:\s?ti)?/i,

        /rx\s?\d{3,4}(?:\s?xt)?/i,

        /ryzen\s?[3579](?:\s?\d{4}[a-z]*)?/i,

        /intel\s?i[3579](?:[-\s]?\d{4,5}[a-z]*)?/i,

        /\bssd\b/i,

        /\bhdd\b/i,

        /\bram\b/i,

        /\bmotherboard\b/i,

        /\bkeyboard\b/i,

        /\bmouse\b/i,

        /\bmonitor\b/i
    ];


    for (const pattern of productPatterns) {

        const match = message.match(pattern);

        if (match) {

            entities.product = match[0].trim();

            break;
        }
    }


    // ==========================================
    // CATEGORY
    // ==========================================

    const categories = [

        "gpu",
        "cpu",
        "ram",
        "ssd",
        "hdd",
        "motherboard",
        "keyboard",
        "mouse",
        "monitor",
        "power supply",
        "psu"
    ];


    for (const category of categories) {

        if (text.includes(category)) {

            entities.category = category;

            break;
        }
    }


    // ==========================================
    // SKU
    // ==========================================

    const skuMatch = message.match(
        /\bsku[\s:#-]*([a-z0-9_-]+)\b/i
    );


    if (skuMatch) {

        entities.sku = skuMatch[1];

    }


    // ==========================================
    // BARCODE
    // ==========================================

    const barcodeMatch = message.match(
        /\bbarcode[\s:#-]*(\d+)\b/i
    );


    if (barcodeMatch) {

        entities.barcode = barcodeMatch[1];

    }


    // ==========================================
    // SUPPLIER
    // ==========================================

    const supplierMatch = message.match(
        /supplier\s+(?:named\s+|called\s+)?(.+)/i
    );


    if (supplierMatch) {

        entities.supplier =
            supplierMatch[1].trim();

    }


    return entities;
}

module.exports = extractEntities;