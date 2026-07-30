export default function ChatInput() {
    console.log("ChatInput Rendered");

    return (
        <div style={{ background: "red", padding: "20px" }}>
            <h2>ChatInput Works</h2>
            <input placeholder="Type here..." />
            <button>Send</button>
        </div>
    );
}