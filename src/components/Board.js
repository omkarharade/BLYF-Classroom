'use client';

import React, { useState } from "react";
import Image from "next/image";

export default function DiceBoard({ questions, playerScores, specialBlocks }) {
  const [positions, setPositions] = useState({ p1: 1, p2: 1 });
  const [currentPlayer, setCurrentPlayer] = useState("p1");
  const [diceValue, setDiceValue] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(playerScores);
  const [skipTurn, setSkipTurn] = useState({ p1: false, p2: false });
  const [pendingMove, setPendingMove] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);

    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);

        let newPos = positions[currentPlayer] + finalRoll;
        if (newPos > 100) newPos = 100;

        setPendingMove(newPos);

        setTimeout(() => {
          setRolling(false);
        }, 300);

        setTimeout(() => {
          setShowQuestion(true);
        }, 2000);
      }
    }, 100);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect && pendingMove !== null) {
      setPositions((prev) => ({ ...prev, [currentPlayer]: pendingMove }));

      handleSpecialBlock(pendingMove, currentPlayer);

      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
    }

    setShowQuestion(false);
    setCurrentQuestionIndex((prev) => prev + 1);
    setPendingMove(null);

    switchTurn();
  };

  const handleSpecialBlock = (pos, player) => {
    const special = specialBlocks[pos];
    if (!special) return;

    if (special.type === "move") {
      setPositions((prev) => ({
        ...prev,
        [player]: Math.max(1, pos + special.value),
      }));
    }

    if (special.type === "extraTurn") {
      return;
    }

    if (special.type === "skipTurn") {
      setSkipTurn((prev) => ({ ...prev, [player]: true }));
    }

    if (special.type === "flipQuestion") {
      // Implement flip question logic if needed
    }
  };

  const switchTurn = () => {
    const nextPlayer = currentPlayer === "p1" ? "p2" : "p1";

    if (skipTurn[nextPlayer]) {
      setSkipTurn((prev) => ({ ...prev, [nextPlayer]: false }));
      setCurrentPlayer(currentPlayer);
    } else {
      setCurrentPlayer(nextPlayer);
    }
  };

  const renderCell = (num) => {
    const isP1 = positions.p1 === num;
    const isP2 = positions.p2 === num;
    const special = specialBlocks[num];

    return (
      <div
        key={num}
        className={`w-12 h-12 border flex items-center justify-center relative text-sm 
          ${special?.color === "red" ? "bg-red-500" : ""}
          ${special?.color === "blue" ? "bg-blue-400" : ""}
          ${!special && "bg-white"}
          ${!special && "text-black"}
          `}

      >
        {num}
        {isP1 && (
          <div className="absolute bottom-0 left-0 text-xs bg-lime-500">P1</div>
        )}
        {isP2 && (
          <div className="absolute top-0 right-0 text-xs bg-purple-500">P2</div>
        )}
      </div>
    );
  };

  return (
  <div className="flex flex-col lg:flex-row gap-6 p-4 justify-center items-center min-h-screen text-white">
    
    {/* Left: Scores */}
    <div className="flex flex-col gap-6 p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl border border-purple-500 w-48">
      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold text-purple-300">Player 1</div>
        <div className="text-3xl font-bold text-lime-400">{scores.p1}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold text-purple-300">Player 2</div>
        <div className="text-3xl font-bold text-pink-400">{scores.p2}</div>
      </div>
    </div>

    {/* Center: Game Board */}
    <div className="grid grid-cols-10 gap-1 border-4 border-gray-600 p-2 bg-gray-700 rounded-lg shadow-xl">
      {Array.from({ length: 100 }, (_, i) => renderCell(i + 1))}
    </div>

    {/* Right: Dice Area */}
    <div className="flex flex-col items-center gap-6 bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-2xl border border-cyan-500 w-60">
      
      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={rolling}
        className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg ${
          rolling
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 hover:scale-105"
        }`}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      {/* Dice Box */}
      <div className="flex items-center justify-center bg-black bg-opacity-20 border border-cyan-400 rounded-2xl p-6 shadow-inner">
        {diceValue ? (
          <Image
            src={`/images/dice-${diceValue}.png`}
            alt={`Dice ${diceValue}`}
            width={64}
            height={64}
            className={`transition-transform duration-300 ${
              rolling ? "animate-spin" : ""
            }`}
          />
        ) : (
          <Image
            src="/images/dice-1.png"
            alt="Dice"
            width={64}
            height={64}
            className="opacity-50"
          />
        )}
      </div>
    </div>

    {/* Question Modal */}
{showQuestion && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full text-black">
      <h2 className="font-bold text-xl mb-2">🧠 Question</h2>
      <p className="mb-4">{questions[currentQuestionIndex]?.q}</p>

      {/* Toggleable Answer Section */}
      <div className="mb-4">
        <details className="bg-yellow-100 rounded p-3">
          <summary className="cursor-pointer font-semibold text-yellow-800">
            Reveal Answer
          </summary>
          <div className="mt-2 max-h-40 overflow-y-auto text-sm text-black">
            {questions[currentQuestionIndex]?.ans || "No answer provided."}
          </div>
        </details>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => handleAnswer(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Correct
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Incorrect
        </button>
      </div>
    </div>
  </div>
)}

  </div>
);

}
