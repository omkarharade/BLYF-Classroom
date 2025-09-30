"use client";

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

  /** 🎲 Roll Dice */
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

  /** ✅ Answer Handling */
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

    if (diceValue === 6) {
      return; // extra turn
    }

    switchTurn();
  };

  /** 🔹 Special Block Routing */
  const handleSpecialBlock = (pos, player) => {
    const special = specialBlocks[pos];
    if (!special) return;

    switch (special.type) {
      case "move":
        setPositions((prev) => ({
          ...prev,
          [player]: Math.max(1, pos + special.value),
        }));
        break;
      case "extraTurn":
        break; // automatically handled
      case "skipTurn":
        setSkipTurn((prev) => ({ ...prev, [player]: true }));
        break;
      case "flipQuestion":
        alert("🔄 Flip Question! Replace with special logic.");
        break;
      case "doubleQuestion":
        alert("❓ Answer 2 Questions!");
        break;
      case "otherTeamAnswers":
        alert(`🎯 Other team will answer instead of ${player}`);
        break;
      case "oppositeAnswers":
        alert(`🤝 Opposite team answers for ${player}`);
        break;
      default:
        break;
    }
  };

  /** 🔄 Switch Player Turn */
  const switchTurn = () => {
    const nextPlayer = currentPlayer === "p1" ? "p2" : "p1";
    if (skipTurn[nextPlayer]) {
      setSkipTurn((prev) => ({ ...prev, [nextPlayer]: false }));
      setCurrentPlayer(currentPlayer);
    } else {
      setCurrentPlayer(nextPlayer);
    }
  };

  /** 🎨 Render Each Cell */
  const renderCell = (num) => {
    const isP1 = positions.p1 === num;
    const isP2 = positions.p2 === num;
    const special = specialBlocks[num];

    return (
      <div
        key={num}
        className={`w-[3.5rem] h-[3.5rem] border relative flex items-center justify-center text-lg 
          ${special?.color === "red" ? "bg-red-500" : ""}
          ${special?.color === "blue" ? "bg-blue-400" : ""}
          ${!special && "bg-white text-black"}
        `}
      >
        <span className="text-sm font-semibold text-gray-700">{num}</span>
        {isP1 && (
          <div className="absolute top-0 left-0">
            <Image
              src="/images/board-piece.png"
              alt="Player 1"
              width={32}
              height={32}
              className="object-contain mix-blend-multiply bg-lime-500 rounded-full"
            />
          </div>
        )}
        {isP2 && (
          <div className="absolute bottom-0 right-0">
            <Image
              src="/images/board-piece.png"
              alt="Player 2"
              width={32}
              height={32}
              className="object-contain mix-blend-multiply bg-purple-500 rounded-full"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 justify-center items-center min-h-screen text-white">
      {/* Game Board */}
      <div className="grid grid-cols-10 gap-1 border-4 border-gray-600 p-2 bg-gray-700 rounded-lg shadow-xl">
        {Array.from({ length: 100 }, (_, i) => renderCell(i + 1))}
      </div>

      {/* Dice Area */}
      <div className="flex flex-col items-center gap-6 bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-2xl border border-cyan-500 w-60">
        <div className="w-full text-center mb-2">
          <p className="text-lg font-semibold">Current Turn</p>
          <p
            className={`text-xl font-bold ${
              currentPlayer === "p1" ? "text-lime-400" : "text-purple-400"
            }`}
          >
            {currentPlayer === "p1" ? "Player 1" : "Player 2"}
          </p>
        </div>

        <button
          onClick={rollDice}
          disabled={rolling}
          className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg 
            ${
              rolling
                ? "bg-gray-500 cursor-not-allowed"
                : currentPlayer === "p1"
                ? "bg-lime-600 hover:bg-lime-600 hover:scale-105"
                : "bg-purple-600 hover:bg-purple-600 hover:scale-105"
            }`}
        >
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>

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
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-7xl w-full text-black">
            <h2 className="font-bold text-2xl mb-4">🧠 Question</h2>

            <div className="my-10">
              {/* English Question */}
              <p className="text-2xl font-medium text-black">
                {questions[currentQuestionIndex]?.q}
              </p>
              {/* Hindi Question */}
              <p className="text-2xl font-medium text-black mt-5">
                {questions[currentQuestionIndex]?.qHindi}
              </p>
            </div>

            <div className="mb-4">
              <details className="bg-yellow-100 rounded p-3">
                <summary className="cursor-pointer font-semibold text-yellow-800 text-lg">
                  Reveal Answer
                </summary>
                <div className="mt-4 max-h-40 overflow-y-auto text-black">
                  <p className="text-2xl">
                    {questions[currentQuestionIndex]?.ans || "No answer provided."}
                  </p>
                  <p className="text-2xl mt-2">
                    {questions[currentQuestionIndex]?.ansHindi || "उत्तर उपलब्ध नहीं।"}
                  </p>
                </div>
              </details>
            </div>

            <div className="flex justify-start gap-4">
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
