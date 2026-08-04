class ContextResolver {

    resolve(message, context) {

        if (!message || !context) {
            return null;
        }

        const text = message
            .toLowerCase()
            .trim();
        const followUpPatterns = [
    "only",
    "just",
    "what about",
    "how about",
    "from those",
    "from them",
    "among those",
    "among them",
    "filter",
    "of those"
];

const isFollowUp =
    followUpPatterns.some(
        pattern => text.includes(pattern)
    );

if (!isFollowUp) {
    return null;
}
        const lastResult = context.lastResult;

        // No previous result available
        if (
            !Array.isArray(lastResult) ||
            lastResult.length === 0
        ) {
            return null;
        }

        // ==========================================
        // CATEGORY FILTERS
        // ==========================================

        const categories = {

            cpu: [
                "cpu",
                "cpus",
                "processor",
                "processors"
            ],

            gpu: [
                "gpu",
                "gpus",
                "graphics card",
                "graphics cards"
            ],

            ram: [
                "ram",
                "memory"
            ],

            ssd: [
                "ssd",
                "ssds"
            ],

            hdd: [
                "hdd",
                "hard drive",
                "hard drives"
            ],

            monitor: [
                "monitor",
                "monitors",
                "display",
                "displays"
            ]

        };

        // ==========================================
        // FIND CATEGORY IN MESSAGE
        // ==========================================

        for (
            const [category, keywords]
            of Object.entries(categories)
        ) {

            const matched =
                keywords.some(
                    keyword =>
                        text.includes(keyword)
                );

            if (!matched) {
                continue;
            }

            const filtered =
                lastResult.filter(item => {

                    if (!item.category) {
                        return false;
                    }

                    return (
                        item.category
                            .toLowerCase() ===
                        category
                    );

                });

            return {

                handled: true,

                type: "FILTER_CATEGORY",

                category,

                title:
                    `${category.toUpperCase()} Results`,

                data: filtered

            };

        }

        return null;

    }

}

module.exports = new ContextResolver();