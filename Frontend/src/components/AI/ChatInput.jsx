import "./ChatInput.css";

export default function ChatInput({
    input,
    setInput,
    onSend,
}) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <div className="chat-input">

            <input
                type="text"
                value={input}
                placeholder="Ask Warehouse AI..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button onClick={onSend}>
                Send
            </button>

        </div>
    );
}