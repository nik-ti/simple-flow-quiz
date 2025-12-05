"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
    onSelect: (lang: "en" | "ru") => void;
}

export function LanguageSelector({ onSelect }: LanguageSelectorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100 tracking-tight">
                    Quick Assessment
                </h1>
                <p className="text-slate-400 text-base md:text-lg font-light">
                    Select your preferred language
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 w-full">
                <LanguageOption
                    flag="🇺🇸"
                    label="English"
                    onClick={() => onSelect("en")}
                    delay={0.2}
                />
                <LanguageOption
                    flag="🇷🇺"
                    label="Русский"
                    onClick={() => onSelect("ru")}
                    delay={0.3}
                />
            </div>
        </div>
    );
}

function LanguageOption({
    flag,
    label,
    onClick,
    delay,
}: {
    flag: string;
    label: string;
    onClick: () => void;
    delay: number;
}) {
    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "glass-panel w-full p-5 rounded-2xl flex items-center gap-4",
                "hover:border-slate-600 transition-all duration-300",
                "group cursor-pointer text-left"
            )}
        >
            <span className="text-3xl filter drop-shadow-lg">{flag}</span>
            <span className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                {label}
            </span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                →
            </div>
        </motion.button>
    );
}
