"use client"; // Add this directive at the top

import { useState } from "react";
import questions from "./data/questions.json";

export default function App() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0); // Track the score

  const onOptionSelected = (selectedOptionIndex) => {
    setSelectedOptionIndex(selectedOptionIndex);

    // Check if the selected option is correct
    if (selectedOptionIndex === questions[currentQIndex].correctOptionIndex) {
      setScore(score + 1); // Increment score if correct
    }

    // Automatically move to the next question after 1.5 seconds
    setTimeout(() => {
      setSelectedOptionIndex(null); // Reset selected option
      setCurrentQIndex(currentQIndex + 1); // Move to the next question
    }, 1500); // 1.5 seconds delay
  };

  const restart = () => {
    setCurrentQIndex(0); // Reset quiz
    setSelectedOptionIndex(null); // Reset selected option
    setScore(0); // Reset score
  };

  // Calculate progress percentage
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  // Calculate score percentage
  const scorePercentage = ((score / questions.length) * 100).toFixed(2); // Round to 2 decimal places

  // Check if the quiz is finished
  if (currentQIndex === questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
        <h1 className="text-3xl font-bold mb-4">Online Quiz</h1>
        <h3 className="text-xl mb-4">Quiz Finished!</h3>
        <p className="text-lg mb-4">
          Your Score: {score} / {questions.length} ({scorePercentage}%)
        </p>
        {/* Conditional Message */}
        {scorePercentage > 50 ? (
          <p className="text-green-600 text-lg mb-4">Congratulations! You achieved the target. 🎉</p>
        ) : (
          <p className="text-red-600 text-lg mb-4">You didn't achieve the target. Retry again! 🔄</p>
        )}
        <button
          onClick={restart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Online Quiz</h1>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }} // Set width based on progress
          ></div>
        </div>

        {/* Current Question */}
        <div key={questions[currentQIndex]?.id} className="mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{questions[currentQIndex]?.statement}</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {questions[currentQIndex]?.options.map((option, index) => {
              const isCorrect = index === questions[currentQIndex].correctOptionIndex;
              const isSelected = index === selectedOptionIndex;
              const isWrong = isSelected && !isCorrect;

              return (
                <li
                  key={index}
                  className={`p-4 ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-200 text-green-800" // Correct option
                        : "bg-red-200 text-red-800" // Wrong option
                      : "hover:bg-gray-50" // Default hover
                  }`}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="option"
                      value={index}
                      checked={isSelected}
                      onChange={() => onOptionSelected(index)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}