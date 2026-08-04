class ConversationStore {

    constructor() {

        this.sessions = new Map();

    }

    // ----------------------------------
    // Get or Create Session
    // ----------------------------------

    getSession(sessionId = "default") {

        if (!this.sessions.has(sessionId)) {

            this.sessions.set(sessionId, {

                messages: [],

                context: {

                    lastIntent: null,

                    lastEntities: {},

                    lastTool: null,

                    lastResult: null,

                    lastAction: null,

                    updatedAt: null

                }

            });

        }

        return this.sessions.get(sessionId);

    }

    // ----------------------------------
    // Messages
    // ----------------------------------

    addMessage(sessionId, role, content) {

        const session = this.getSession(sessionId);

        session.messages.push({

            role,

            content,

            timestamp: Date.now()

        });

    }

    getMessages(sessionId) {

        return this.getSession(sessionId).messages;

    }

    clearMessages(sessionId) {

        this.getSession(sessionId).messages = [];

    }

    // ----------------------------------
    // Context
    // ----------------------------------

    updateContext(sessionId, data) {

        const session = this.getSession(sessionId);

        session.context = {

            ...session.context,

            ...data,

            updatedAt: Date.now()

        };

    }

    getContext(sessionId) {

        return this.getSession(sessionId).context;

    }

    clearContext(sessionId) {

        this.getSession(sessionId).context = {

            lastIntent: null,

            lastEntities: {},

            lastTool: null,

            lastResult: null,

            lastAction: null,

            updatedAt: null

        };

    }

}

module.exports = new ConversationStore();