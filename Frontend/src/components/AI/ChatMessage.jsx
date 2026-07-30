import "./ChatMessage.css";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`message-row ${isUser ? "user" : "assistant"}`}>
            <div className="avatar">
                {isUser ? "👤" : "🤖"}
            </div>

            <div className="message-content">
                <div className="message-bubble">
                    {message.content}
                </div>

                <span className="message-time">
                    {message.time}
                </span>
            </div>
        </div>
    );
}