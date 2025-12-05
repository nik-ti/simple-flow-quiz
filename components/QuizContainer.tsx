"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSelector } from "./LanguageSelector";
import { QuestionCard } from "./QuestionCard";
import { ContactForm } from "./ContactForm";
import { ThankYouScreen } from "./ThankYouScreen";
import { questions } from "@/data/questions";

type QuizState = "language" | "quiz" | "contact" | "thank-you";

export default function QuizContainer() {
    const [view, setView] = useState<QuizState>("language");
    const [language, setLanguage] = useState<"en" | "ru">("en");
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLanguageSelect = (lang: "en" | "ru") => {
        setLanguage(lang);
        setView("quiz");
    };

    const handleAnswer = (answer: any) => {
        const currentQuestion = questions[currentQuestionIndex];
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    };

    const submitData = async (finalAnswers: any, contactInfo?: any) => {
        setIsSubmitting(true);
        try {
            const payload = {
                timestamp: new Date().toISOString(),
                language,
                answers: finalAnswers,
                contactInfo,
            };

            await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            setView("thank-you");
        } catch (error) {
            console.error("Submission failed", error);
            // Still show thank you screen to not disrupt user experience
            setView("thank-you");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
            // Check if user wants to be contacted
            // The question ID for contact permission is 'contact_permission'
            // Options are Yes/No (or translated)
            const contactPermission = answers["contact_permission"];
            // Handle both string answer and object answer (from conditional input logic)
            const selection = typeof contactPermission === 'object' ? contactPermission.selection : contactPermission;

            const wantsContact =
                selection === "Yes" || selection === "Да";

            if (wantsContact) {
                setView("contact");
            } else {
                submitData(answers);
            }
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        } else {
            // If at first question, go back to language selection
            setView("language");
        }
    };

    const handleContactSubmit = (contactInfo: any) => {
        submitData(answers, contactInfo);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <AnimatePresence mode="wait">
                {view === "language" && (
                    <motion.div
                        key="language"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl z-10"
                    >
                        <LanguageSelector onSelect={handleLanguageSelect} />
                    </motion.div>
                )}

                {view === "quiz" && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full z-10"
                    >
                        <QuestionCard
                            question={questions[currentQuestionIndex]}
                            language={language}
                            answer={answers[questions[currentQuestionIndex].id]}
                            onAnswer={handleAnswer}
                            onNext={handleNext}
                            onBack={handleBack}
                            isFirstQuestion={currentQuestionIndex === 0}
                            isLastQuestion={currentQuestionIndex === questions.length - 1}
                            totalQuestions={questions.length}
                            currentQuestionIndex={currentQuestionIndex}
                        />
                    </motion.div>
                )}

                {view === "contact" && (
                    <motion.div
                        key="contact"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full z-10"
                    >
                        <ContactForm language={language} onSubmit={handleContactSubmit} />
                    </motion.div>
                )}

                {view === "thank-you" && (
                    <motion.div
                        key="thank-you"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full z-10"
                    >
                        <ThankYouScreen language={language} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
