"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface QuestionCardProps {
    question: Question;
    language: "en" | "ru";
    answer: any;
    onAnswer: (answer: any) => void;
    onNext: () => void;
    onBack: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    totalQuestions: number;
    currentQuestionIndex: number;
}

export function QuestionCard({
    question,
    language,
    answer,
    onAnswer,
    onNext,
    onBack,
    isFirstQuestion,
    isLastQuestion,
    totalQuestions,
    currentQuestionIndex,
}: QuestionCardProps) {
    const text = question.text[language];
    const options = question.options?.[language];
    const placeholder = question.placeholder?.[language];

    // Local state for conditional input to avoid clearing it when switching options
    const [conditionalText, setConditionalText] = useState("");

    // Initialize conditional text if answer is an object (structure: { selection: string, details: string })
    useEffect(() => {
        if (typeof answer === "object" && answer !== null && !Array.isArray(answer)) {
            setConditionalText(answer.details || "");
        } else {
            setConditionalText("");
        }
    }, [question.id, answer]);

    const handleChoiceSelect = (option: string) => {
        // If this option triggers input, we need to keep the current text if it exists
        if (question.conditionalInput?.trigger === option) {
            onAnswer({ selection: option, details: conditionalText });
        } else {
            onAnswer(option);
        }
    };

    const handleMultiSelect = (option: string) => {
        const currentAnswers = Array.isArray(answer?.selection || answer)
            ? (answer?.selection || answer)
            : [];

        let newAnswers;
        if (currentAnswers.includes(option)) {
            newAnswers = currentAnswers.filter((a: string) => a !== option);
        } else {
            newAnswers = [...currentAnswers, option];
        }

        // Check if any selected option triggers input
        const triggersInput = question.conditionalInput && newAnswers.includes(question.conditionalInput.trigger);

        if (triggersInput) {
            onAnswer({ selection: newAnswers, details: conditionalText });
        } else {
            onAnswer(newAnswers);
        }
    };

    const handleConditionalTextChange = (text: string) => {
        setConditionalText(text);

        // Update parent state
        if (question.type === "choice") {
            // For choice, answer is object { selection: string, details: string }
            const currentSelection = typeof answer === "object" ? answer.selection : answer;
            onAnswer({ selection: currentSelection, details: text });
        } else if (question.type === "multi-select") {
            // For multi-select, answer is object { selection: string[], details: string }
            const currentSelection = typeof answer === "object" && !Array.isArray(answer) ? answer.selection : answer;
            onAnswer({ selection: currentSelection, details: text });
        }
    };

    // Determine if we should show the conditional input
    const showConditionalInput = (() => {
        if (!question.conditionalInput) return false;

        if (question.type === "choice") {
            const currentSelection = typeof answer === "object" ? answer.selection : answer;
            return currentSelection === question.conditionalInput.trigger;
        }

        if (question.type === "multi-select") {
            const currentSelection = typeof answer === "object" && !Array.isArray(answer) ? answer.selection : answer;
            return Array.isArray(currentSelection) && currentSelection.includes(question.conditionalInput.trigger);
        }

        return false;
    })();

    const isAnswered = (() => {
        if (question.type === "text") return !!answer;

        if (question.type === "choice") {
            const selection = typeof answer === "object" ? answer.selection : answer;
            if (!selection) return false;
            if (showConditionalInput && !conditionalText) return false; // Require text if input shown
            return true;
        }

        if (question.type === "multi-select") {
            const selection = typeof answer === "object" && !Array.isArray(answer) ? answer.selection : answer;
            if (!Array.isArray(selection) || selection.length === 0) return false;
            if (showConditionalInput && !conditionalText) return false;
            return true;
        }

        return false;
    })();

    // Handle Enter key for navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && isAnswered) {
                // Prevent default to avoid form submission if wrapped in form
                e.preventDefault();
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isAnswered, onNext]);

    const getSelection = () => {
        if (typeof answer === "object" && answer !== null && !Array.isArray(answer)) {
            return answer.selection;
        }
        return answer;
    };

    const currentSelection = getSelection();

    return (
        <div className="w-full max-w-xl mx-auto px-4 md:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden"
            >
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/50">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <div className="mb-6 md:mb-8 mt-4">
                    <span className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">
                        {language === "en" ? "Question" : "Вопрос"} {currentQuestionIndex + 1}{" "}
                        / {totalQuestions}
                    </span>
                    <h2 className="text-xl md:text-3xl font-bold mt-3 md:mt-4 leading-relaxed text-slate-100">
                        {text}
                    </h2>
                </div>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                    {question.type === "text" && (
                        <input
                            type="text"
                            value={answer || ""}
                            onChange={(e) => onAnswer(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-base md:text-lg focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 text-slate-200"
                            autoFocus
                        />
                    )}

                    {question.type === "choice" &&
                        options?.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleChoiceSelect(option)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm md:text-base",
                                    currentSelection === option
                                        ? "border-primary/50 bg-primary/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                        : "border-slate-700/30 bg-slate-900/20 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                                )}
                            >
                                {option}
                            </motion.button>
                        ))}

                    {question.type === "multi-select" &&
                        options?.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleMultiSelect(option)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between text-sm md:text-base",
                                    (currentSelection as string[])?.includes(option)
                                        ? "border-primary/50 bg-primary/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                        : "border-slate-700/30 bg-slate-900/20 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                                )}
                            >
                                <span>{option}</span>
                                {(currentSelection as string[])?.includes(option) && (
                                    <span className="text-primary">✓</span>
                                )}
                            </motion.button>
                        ))}

                    {/* Conditional Input */}
                    <AnimatePresence>
                        {showConditionalInput && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-2">
                                    <input
                                        type="text"
                                        value={conditionalText}
                                        onChange={(e) => handleConditionalTextChange(e.target.value)}
                                        placeholder={question.conditionalInput?.placeholder[language]}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-base md:text-lg focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 text-slate-200"
                                        autoFocus
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                    <button
                        onClick={onBack}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full transition-colors text-sm md:text-base",
                            "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                        )}
                    >
                        <ArrowLeft size={18} />
                        {language === "en" ? "Back" : "Назад"}
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!isAnswered}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 md:px-8 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base",
                            isAnswered
                                ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
                                : "bg-slate-900/50 text-slate-600 cursor-not-allowed border border-transparent"
                        )}
                    >
                        {isLastQuestion
                            ? language === "en"
                                ? "Finish"
                                : "Завершить"
                            : language === "en"
                                ? "Next"
                                : "Далее"}
                        {!isLastQuestion && <ArrowRight size={18} />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
