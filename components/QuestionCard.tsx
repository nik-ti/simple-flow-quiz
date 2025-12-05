"use client";

import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

    const handleMultiSelect = (option: string) => {
        const currentAnswers = (answer as string[]) || [];
        if (currentAnswers.includes(option)) {
            onAnswer(currentAnswers.filter((a) => a !== option));
        } else {
            onAnswer([...currentAnswers, option]);
        }
    };

    const isAnswered =
        question.type === "multi-select"
            ? Array.isArray(answer) && answer.length > 0
            : !!answer;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <div className="mb-8 mt-4">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        {language === "en" ? "Question" : "Вопрос"} {currentQuestionIndex + 1}{" "}
                        / {totalQuestions}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mt-4 leading-relaxed">
                        {text}
                    </h2>
                </div>

                <div className="space-y-4 mb-12">
                    {question.type === "text" && (
                        <input
                            type="text"
                            value={answer || ""}
                            onChange={(e) => onAnswer(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600"
                            autoFocus
                        />
                    )}

                    {question.type === "choice" &&
                        options?.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => onAnswer(option)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-200",
                                    answer === option
                                        ? "border-primary bg-primary/10 text-white"
                                        : "border-slate-700 bg-slate-900/30 text-slate-300 hover:border-slate-500"
                                )}
                            >
                                {option}
                            </motion.button>
                        ))}

                    {question.type === "multi-select" &&
                        options?.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleMultiSelect(option)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between",
                                    (answer as string[])?.includes(option)
                                        ? "border-primary bg-primary/10 text-white"
                                        : "border-slate-700 bg-slate-900/30 text-slate-300 hover:border-slate-500"
                                )}
                            >
                                <span>{option}</span>
                                {(answer as string[])?.includes(option) && (
                                    <span className="text-primary">✓</span>
                                )}
                            </motion.button>
                        ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={onBack}
                        disabled={isFirstQuestion}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full transition-colors",
                            isFirstQuestion
                                ? "opacity-0 pointer-events-none"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <ArrowLeft size={20} />
                        {language === "en" ? "Back" : "Назад"}
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!isAnswered}
                        className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300",
                            isAnswered
                                ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
                                : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        )}
                    >
                        {isLastQuestion
                            ? language === "en"
                                ? "Finish"
                                : "Завершить"
                            : language === "en"
                                ? "Next"
                                : "Далее"}
                        {!isLastQuestion && <ArrowRight size={20} />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
