class EntityExtractor {

    extract(prompt, intent) {

        const entities = {};

        switch (intent) {

            case "SEARCH_PRODUCT": {

                const match = prompt.match(/(?:find|search|locate)\s+(.+)/i);

                if (match) {
                    entities.product = match[1].trim();
                }

                break;
            }

        }

        return entities;

    }

}

module.exports = new EntityExtractor();