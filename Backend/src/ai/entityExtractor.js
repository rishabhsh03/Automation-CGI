class EntityExtractor {

    extract(prompt, intent) {

        const entities = {};

        switch (intent) {

            case "SEARCH_PRODUCT":

                // SKU
                let match = prompt.match(/sku\s+([a-zA-Z0-9-_]+)/i);

                if (match) {

                    entities.type = "sku";
                    entities.value = match[1];

                    return entities;
                }

                // Category
                match = prompt.match(/(?:category|products?)\s+([a-zA-Z]+)/i);

                if (match) {

                    entities.type = "category";
                    entities.value = match[1];

                    return entities;
                }

                // Product Name
                match = prompt.match(/(?:find|search|show)\s+(.+)/i);

                if (match) {

                    entities.type = "name";
                    entities.value = match[1];

                }

                return entities;

            default:
                return {};

        }

    }

}

module.exports = new EntityExtractor();