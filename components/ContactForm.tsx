"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ContactFormProps {
    language: "en" | "ru";
    onSubmit: (contactInfo: any) => void;
}

export function ContactForm({ language, onSubmit }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telegram: "",
        phone: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!formData.email && !formData.telegram && !formData.phone) {
            setError(
                language === "en"
                    ? "Please fill in at least one contact method."
                    : "Пожалуйста, заполните хотя бы один способ связи."
            );
            return;
        }
        onSubmit(formData);
    };

    const labels = {
        title:
            language === "en"
                ? "How should we contact you?"
                : "Как нам с вами связаться?",
        subtitle:
            language === "en"
                ? "Please provide at least one way to reach you."
                : "Пожалуйста, укажите хотя бы один способ связи.",
        name: language === "en" ? "Name" : "Имя",
        email: language === "en" ? "Email" : "Email",
        telegram: language === "en" ? "Telegram @handle" : "Telegram @ник",
        phone: language === "en" ? "Phone (optional)" : "Телефон (опционально)",
        submit: language === "en" ? "Submit" : "Отправить",
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-3xl p-8 md:p-12"
            >
                <h2 className="text-3xl font-bold mb-2">{labels.title}</h2>
                <p className="text-slate-400 mb-8">{labels.subtitle}</p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">
                            {labels.name}
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">
                            {labels.email}
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                setError("");
                            }}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">
                            {labels.telegram}
                        </label>
                        <input
                            type="text"
                            value={formData.telegram}
                            onChange={(e) => {
                                setFormData({ ...formData, telegram: e.target.value });
                                setError("");
                            }}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">
                            {labels.phone}
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                setError("");
                            }}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-4 text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                    {labels.submit}
                    <ArrowRight size={20} />
                </button>
            </motion.div>
        </div>
    );
}
