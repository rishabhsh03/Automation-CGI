import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ChatHeader from "../../components/AI/ChatHeader";
import EmptyState from "../../components/AI/EmptyState";
import ChatInput from "../../components/AI/ChatInput";
import ChatMessage from "../../components/AI/ChatMessage";
import "./AI.css";

export default function AI() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

const handleSend = () => {

    if (!input.trim()) return;

    const userMessage = {

        id: Date.now(),

        role: "user",

        content: input,

        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })

    };

    setMessages((prev) => [...prev, userMessage]);

setTimeout(() => {

    const aiMessage = {

        id: Date.now() + 1,

        role: "assistant",

        content: "I'm Warehouse AI. I understood your message: " + userMessage.content,

        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })

    };

    setMessages(prev => [...prev, aiMessage]);

},1000);
};
    return (
        <div className="ai-layout">

            <Sidebar />

            <main className="ai-content">

                <Navbar />

                <div className="chat-container">

                    <ChatHeader />
                <div className="chat-body">
                  <div className="chat-body">

    {messages.length === 0 ? (

        <EmptyState
            onSuggestionClick={(text) => setInput(text)}
        />

    ) : (

        messages.map((message) => (
            <ChatMessage
                key={message.id}
                message={message}
            />
        ))

    )}

</div>

                    <ChatInput
                        input={input}
                        setInput={setInput}
                        onSend={handleSend}
                    />

                </div>
            </div>
            </main>

        </div>
    );
}