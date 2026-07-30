import "./ChatHeader.css";

export default function ChatHeader() {
    return (
        <div className="chat-header">

            <div className="chat-title">

                <h2>🤖 Warehouse AI</h2>

                <p>Your intelligent warehouse assistant</p>

            </div>

            <button className="new-chat-btn">
                + New Chat
            </button>

        </div>
    );
}