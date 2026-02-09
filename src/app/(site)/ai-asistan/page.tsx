"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function AIAsistanPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Merhaba! 👋 Ben Meta AI, Metasoft'un yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    conversationHistory: messages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.reply },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
                    },
                ]);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Bağlantı hatası. Lütfen tekrar deneyin.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
            <div className="container mx-auto px-4 py-8 max-w-4xl h-screen flex flex-col">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-center"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        🤖 Meta AI
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Yapay zeka destekli hizmet danışmanınız
                    </p>
                </motion.div>

                {/* Chat Container */}
                <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex flex-col overflow-hidden">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                        <AnimatePresence>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-6 py-4 rounded-2xl ${msg.role === "user"
                                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-md"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">
                                            {msg.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-2xl">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.4s" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Mesajınızı yazın... (örn: Yılbaşı için öneriniz nedir?)"
                            disabled={loading}
                            className="flex-1 px-6 py-4 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-purple-500 focus:outline-none transition-all disabled:opacity-50 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "⏳" : "Gönder"}
                        </motion.button>
                    </div>
                </div>

                {/* Footer hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4"
                >
                    💡 İpucu: "Düğün için hangi hizmetiniz var?" veya "Yapay zeka ile ne
                    yapabilirsiniz?" gibi sorular sorabilirsiniz
                </motion.p>
            </div>
        </div>
    );
}
