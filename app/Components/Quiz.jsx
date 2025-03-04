"use client"; // Ensure this is at the top

export default function Quiz({ question, currentQIndex, totalQuestions, selectedOptionIndex, onOptionSelected }) {
  const progress = ((currentQIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Online Quiz</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{question?.statement}</h2>
          <ul className="divide-y divide-gray-200">
            {question?.options.map((option, index) => {
              const isCorrect = index === question.correctOptionIndex;
              const isSelected = index === selectedOptionIndex;
              const isWrong = isSelected && !isCorrect;

              return (
                <li
                  key={index}
                  className={`p-4 ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                      : "hover:bg-gray-50"
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

 