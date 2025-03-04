"use client"; // Add this at the top

import { useState } from "react";
import questions from "./data/questions.json";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);

  const onOptionSelected = (selectedOptionIndex) => {
    setSelectedOptionIndex(selectedOptionIndex);

    if (selectedOptionIndex === questions[currentQIndex].correctOptionIndex) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOptionIndex(null);
      setCurrentQIndex(currentQIndex + 1);
    }, 300);
  };

  const restart = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
  };

  if (currentQIndex === questions.length) {
    return <Result score={score} total={questions.length} restart={restart} />;
  }

  return (
    <Quiz
      question={questions[currentQIndex]}
      currentQIndex={currentQIndex}
      totalQuestions={questions.length}
      selectedOptionIndex={selectedOptionIndex}
      onOptionSelected={onOptionSelected}
    />
  );
}
