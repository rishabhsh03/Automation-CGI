class ConversationStore {
    constructor() {
        this.conversations = new Map();
    }

    getMessages(sessionId) {
        if (!this.conversations.has(sessionId)) {
            this.conversations.set(sessionId, []);
        }

        return this.conversations.get(sessionId);
    }

    addMessage(sessionId, role, content) {
        const messages = this.getMessages(sessionId);

        messages.push({
            role,
            content
        });

        // Keep only the last 20 messages
        if (messages.length > 20) {
            messages.shift();
        }
    }

    clearConversation(sessionId) {
        this.conversations.delete(sessionId);
    }
}

module.exports = new ConversationStore();