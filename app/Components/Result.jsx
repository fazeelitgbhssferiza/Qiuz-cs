"use client"; // Ensure this is at the top

export default function Result({ score, total, restart }) {
  const scorePercentage = ((score / total) * 100).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <h1 className="text-3xl font-bold mb-4">Online Quiz</h1>
      <h3 className="text-xl mb-4">Quiz Finished!</h3>
      <p className="text-lg mb-4">
        Your Score: {score} / {total} ({scorePercentage}%)
      </p>
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


