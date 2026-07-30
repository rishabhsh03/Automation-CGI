import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ChatHeader from "../../components/AI/ChatHeader";
import EmptyState from "../../components/AI/EmptyState";
import ChatInput from "../../components/AI/ChatInput";

import "./AI.css";

export default function AI() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

const handleSend = () =>{
    if(!input.trim()) return;
    console.log("User:", input);
    setInput("")
}
    return (
        <div className="ai-layout">

            <Sidebar />

            <main className="ai-content">

                <Navbar />

                <div className="chat-container">

                    <ChatHeader />
                <div className="chat-body">
                    <EmptyState
                        onSuggestionClick={(text) => {
                            setInput(text);
                        }}
                    />

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