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

    // ------------------------------------------
    // SESSION ID
    // ------------------------------------------

    const [sessionId] = useState(() => {

        let storedSession =
            localStorage.getItem("warehouse-ai-session");

        if (!storedSession) {

            storedSession =
                crypto.randomUUID();

            localStorage.setItem(
                "warehouse-ai-session",
                storedSession
            );

        }

        return storedSession;

    });


    // ------------------------------------------
    // SEND MESSAGE
    // ------------------------------------------

    const handleSend = async () => {

        const prompt = input.trim();

        if (!prompt || loading) {
            return;
        }


        // ------------------------------------------
        // USER MESSAGE
        // ------------------------------------------

        const userMessage = {

            id: crypto.randomUUID(),

            role: "user",

            content: prompt,

            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })

        };


        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setInput("");

        setLoading(true);


        try {

            // ------------------------------------------
            // CALL BACKEND AI
            // ------------------------------------------

            const response = await fetch(
                "http://localhost:8000/api/ai/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        sessionId:sessionId,

                        prompt: userMessage.content

                    })
                }
            );


            // ------------------------------------------
            // HTTP ERROR
            // ------------------------------------------

            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );

            }


            const result =
                await response.json();


            console.log(
                "[Warehouse AI Response]",
                result
            );


            // ------------------------------------------
            // AI MESSAGE
            // ------------------------------------------

            const aiMessage = {

                id: crypto.randomUUID(),

                role: "assistant",

                content:
                    result.message ||
                    result.response ||
                    "I couldn't generate a response.",

                title:
                    result.title || null,

                data:
                    result.data || [],

                source:
                    result.source || null,

                intent:
                    result.intent || null,

                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })

            };


            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);


        } catch (error) {

            console.error(
                "[Warehouse AI Error]",
                error
            );


            // ------------------------------------------
            // ERROR MESSAGE
            // ------------------------------------------

            const errorMessage = {

                id: crypto.randomUUID(),

                role: "assistant",

                content:
                    "I couldn't connect to the Warehouse AI server.",

                error: true,

                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })

            };


            setMessages((prev) => [
                ...prev,
                errorMessage
            ]);

        } finally {

            setLoading(false);

        }

    };

const handleNewChat = () => {

    // Clear frontend messages
    setMessages([]);

    // Clear current input
    setInput("");

    // Create a completely new backend conversation
    setSessionId(
        crypto.randomUUID()
    );

};
    return (

        <div className="ai-layout">

            <Sidebar />

            <main className="ai-content">

                <Navbar />

                <div className="chat-container">

                    <ChatHeader 
                    onNewChat={handleNewChat}
                    />

                    <div className="chat-body">

                        {messages.length === 0 ? (

                            <EmptyState
                                onSuggestionClick={
                                    (text) =>
                                        setInput(text)
                                }
                            />

                        ) : (

                            messages.map(
                                (message) => (

                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                    />

                                )
                            )

                        )}


                        {loading && (

                            <div className="ai-loading">
                                Warehouse AI is thinking...
                            </div>

                        )}

                    </div>


                    <ChatInput
                        input={input}
                        setInput={setInput}
                        onSend={handleSend}
                        disabled={loading}
                    />

                </div>

            </main>

        </div>

    );

}