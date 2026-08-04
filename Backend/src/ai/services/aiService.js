const conversationStore = require("../storage/conversationStore");
const contextResolver = require("../contextResolver");
const responseGenerator = require("../responseGenerator");

const analyzeIntent = require("../intentAnalyzer");
const extractEntities = require("../entityExtractor");
const toolDispatcher = require("../toolDispatcher");
const llmService = require("./llmService");
const INTENTS = require("../intents");

class AIService {

    async processMessage(message, sessionId = "default") {

        try {

            // ------------------------------------------
            // VALIDATE MESSAGE
            // ------------------------------------------

            if (!message || !message.trim()) {

                return {
                    success: false,
                    message: "Message is required"
                };

            }

            // ------------------------------------------
            // LOAD CONTEXT
            // ------------------------------------------

            const previousContext =
                conversationStore.getContext(sessionId);

            console.log(
                "[AI] Previous Context:",
                previousContext
            );

            conversationStore.addMessage(
                sessionId,
                "user",
                message
            );

            // ------------------------------------------
            // CONTEXT RESOLVER
            // ------------------------------------------

            const contextResult =
                contextResolver.resolve(
                    message,
                    previousContext
                );

            if (contextResult) {

                console.log(
                    "[AI] Answered From Context"
                );

                const aiResponse =
                    responseGenerator.generate({

                        success: true,

                        tool: contextResult.tool,

                        action: contextResult.action,

                        data: contextResult.data

                    });

                conversationStore.addMessage(
                    sessionId,
                    "assistant",
                    aiResponse.message
                );

                return {

                    success: true,

                    source: "CONTEXT_MEMORY",

                    title: aiResponse.title,

                    message: aiResponse.message,

                    data: contextResult.data

                };

            }

            console.log("\n==============================");
            console.log("[AI] User:", message);
            console.log("==============================");

            // ------------------------------------------
            // RULE ANALYZER
            // ------------------------------------------

            const intentResult =
                analyzeIntent(message);

            const entities =
                extractEntities(message);

            console.log(
                "[AI] Rule Intent:",
                intentResult
            );

            console.log(
                "[AI] Rule Entities:",
                entities
            );

            let analysis;

            // ------------------------------------------
            // RULE BASED
            // ------------------------------------------

            if (
                intentResult.intent !==
                INTENTS.UNKNOWN
            ) {

                console.log(
                    "[AI Router] Using Rule Based"
                );

                analysis = {

                    message,

                    intent:
                        intentResult.intent,

                    score:
                        intentResult.score,

                    matchedKeywords:
                        intentResult.matchedKeywords,

                    entities,

                    source: "RULE_BASED"

                };

            }

            // ------------------------------------------
            // OLLAMA FALLBACK
            // ------------------------------------------

            else {

                console.log(
                    "[AI Router] Using Ollama"
                );

                const llmAnalysis =
                    await llmService.analyzeMessage(
                        message
                    );

                analysis = {

                    message,

                    intent:
                        llmAnalysis.intent,

                    entities: {

                        product:
                            llmAnalysis.entities?.product ?? null,

                        category:
                            llmAnalysis.entities?.category ?? null,

                        supplier:
                            llmAnalysis.entities?.supplier ?? null,

                        quantity:
                            llmAnalysis.entities?.quantity ?? null,

                        sku:
                            llmAnalysis.entities?.sku ?? null,

                        barcode:
                            llmAnalysis.entities?.barcode ?? null

                    },

                    source: "OLLAMA"

                };

            }

            console.log(
                "[AI] Final Analysis:",
                analysis
            );

            // ------------------------------------------
            // GREETING
            // ------------------------------------------

            if (
                analysis.intent ===
                INTENTS.GREETING
            ) {

                const response =
                    "Hello! How can I help you with your warehouse?";

                conversationStore.addMessage(
                    sessionId,
                    "assistant",
                    response
                );

                return {

                    success: true,

                    intent: analysis.intent,

                    source: analysis.source,

                    response

                };

            }

            // ------------------------------------------
            // HELP
            // ------------------------------------------

            if (
                analysis.intent ===
                INTENTS.HELP
            ) {

                const response =
                    "I can search products, check stock, find low-stock products, out-of-stock products, prices, suppliers, orders and dashboards.";

                conversationStore.addMessage(
                    sessionId,
                    "assistant",
                    response
                );

                return {

                    success: true,

                    intent: analysis.intent,

                    source: analysis.source,

                    response

                };

            }

            // ------------------------------------------
            // UNKNOWN
            // ------------------------------------------

            if (
                analysis.intent ===
                INTENTS.UNKNOWN
            ) {

                const response =
                    "I could not understand that request.";

                conversationStore.addMessage(
                    sessionId,
                    "assistant",
                    response
                );

                return {

                    success: false,

                    intent: analysis.intent,

                    source: analysis.source,

                    response

                };

            }

            // ------------------------------------------
            // TOOL EXECUTION
            // ------------------------------------------

            const toolResult =
                await toolDispatcher.dispatch(
                    analysis
                );

            console.log(
                "[AI] Tool Result:",
                toolResult
            );

            // ------------------------------------------
            // UPDATE CONTEXT
            // ------------------------------------------

            conversationStore.updateContext(
                sessionId,
                {

                    lastIntent:
                        analysis.intent,

                    lastEntities:
                        analysis.entities,

                    lastTool:
                        toolResult.tool,

                    lastAction:
                        toolResult.action,

                    lastResult:
                        toolResult.data

                }
            );

            // ------------------------------------------
            // GENERATE RESPONSE
            // ------------------------------------------

            const aiResponse =
                responseGenerator.generate(
                    toolResult
                );

            conversationStore.addMessage(
                sessionId,
                "assistant",
                aiResponse.message
            );

            return {

                success:
                    toolResult.success,

                intent:
                    analysis.intent,

                source:
                    analysis.source,

                title:
                    aiResponse.title,

                message:
                    aiResponse.message,

                data:
                    toolResult.data

            };

        } catch (error) {

            console.error(
                "[AI Service Error]",
                error
            );

            return {

                success: false,

                message:
                    "Something went wrong while processing your request.",

                error:
                    error.message

            };

        }

    }

}

module.exports = new AIService();