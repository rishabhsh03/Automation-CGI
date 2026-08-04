class ContextResolver {

    resolve(message, context) {

        const text = message.toLowerCase();

        if (!context.lastResult) {

            return null;

        }

        // -----------------------------
        // CPU
        // -----------------------------

        if (
            text.includes("cpu") ||
            text.includes("processor")
        ) {

            return {

                handled: true,

                title: "CPU Results",

                data:
                    context.lastResult.filter(
                        item =>
                            item.category &&
                            item.category.toLowerCase() === "cpu"
                    )

            };

        }

        // -----------------------------
        // GPU
        // -----------------------------

        if (
            text.includes("gpu") ||
            text.includes("graphics")
        ) {

            return {

                handled: true,

                title: "GPU Results",

                data:
                    context.lastResult.filter(
                        item =>
                            item.category &&
                            item.category.toLowerCase() === "gpu"
                    )

            };

        }

        return null;

    }

}

module.exports = new ContextResolver();