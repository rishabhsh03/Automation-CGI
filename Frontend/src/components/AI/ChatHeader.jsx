import "./ChatHeader.css";

export default function ChatHeader({
    onNewChat
}) {

    return (

        <div className="chat-header">

            <div>
                <h2>Warehouse AI</h2>
                <p>
                    Ask questions about your warehouse
                </p>
            </div>

            <button
                type="button"
                onClick={onNewChat}
                className="new-chat-btn"
            >
                + New Chat
            </button>

        </div>

    );

}