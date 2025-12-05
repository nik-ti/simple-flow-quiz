"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ThankYouScreenProps {
    language: "en" | "ru";
}

export function ThankYouScreen({ language }: ThankYouScreenProps) {
    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-panel rounded-3xl p-12 flex flex-col items-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8"
                >
                    <CheckCircle className="w-12 h-12 text-green-400" />
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                    {language === "en" ? "Thank You!" : "Спасибо!"}
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                    {language === "en"
                        ? "Your responses have been recorded. We appreciate your time and insights."
                        : "Ваши ответы были записаны. Мы ценим ваше время и мнение."}
                </p>
            </motion.div>
        </div>
    );
}
