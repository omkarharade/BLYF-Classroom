"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Square, RotateCcw, X, Shuffle } from "lucide-react";

export default function DiceBoard({ questions, playerScores, specialBlocks }) {
	const [positions, setPositions] = useState({ p1: 34, p2: 35 });
	const [currentPlayer, setCurrentPlayer] = useState("p1");
	const [answeringPlayer, setAnsweringPlayer] = useState("p1");
	const [diceValue, setDiceValue] = useState(null);
	const [showQuestion, setShowQuestion] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [scores, setScores] = useState(playerScores);
	const [skipTurn, setSkipTurn] = useState({ p1: false, p2: false });
	const [pendingMove, setPendingMove] = useState(null);
	const [rolling, setRolling] = useState(false);
	const [flippedQuestionActive, setFlippedQuestionActive] = useState(false);
	const [showFlipped, setShowFlipped] = useState(false);
	const [extraChance, setExtraChance] = useState({ p1: 0, p2: 0 });

	// ✅ Popup
	const [popup, setPopup] = useState({
		visible: false,
		title: "",
		description: "",
	});

	/** ---------------- TIMER STATES ---------------- */
	const [timer, setTimer] = useState(30);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		if (isTimerRunning && timer > 0) {
			timerRef.current = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else if (timer === 0) {
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [isTimerRunning, timer]);

	const startTimer = () => setIsTimerRunning(true);
	const stopTimer = () => {
		clearInterval(timerRef.current);
		setIsTimerRunning(false);
	};
	const resetTimer = () => {
		clearInterval(timerRef.current);
		setTimer(30);
		setIsTimerRunning(false);
	};

	/** 🎲 Roll Dice */
	const rollDice = () => {
		if (rolling || showQuestion) return;

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
					const special = specialBlocks[newPos];
					setAnsweringPlayer(currentPlayer);

					// Handle flip question specially
					if (special?.type === "flipQuestion") {
						handleFlipQuestion();
						setTimeout(() => {
							setShowQuestion(true);
							resetTimer();
						}, 2000);
						return;
					}

					// Handle other cases
					if (special?.color === "red") {
						setPositions((prev) => ({ ...prev, [currentPlayer]: newPos }));
						handleSpecialBlock(newPos, currentPlayer);
						setPendingMove(null);
						switchTurn();
					} else {
						setTimeout(() => {
							setShowQuestion(true);
							resetTimer();
						}, 2000);
					}
				}, 1000);
			}
		}, 100);
	};

	/** 🔸 Flip Question */
	const handleFlipQuestion = () => {
		setFlippedQuestionActive(true);
		setShowFlipped(false);
		showPopup(
			"Flip Question Available! 🔄",
			"You can switch between questions using the flip button above. Answer correctly to move forward!"
		);
	};

	/** ✅ Handle Answer */
	const handleAnswer = (isCorrect) => {
		let extraTurnTriggered = false;

		if (pendingMove !== null && isCorrect) {
			// Move player only on correct answer
			setPositions((prev) => ({ ...prev, [currentPlayer]: pendingMove }));

			const special = specialBlocks[pendingMove];

			// Handle special block effects after correct answer
			if (special) {
				if (special.type === "move" && special.color === "blue") {
					handleMoveBlock(pendingMove, currentPlayer, special.value);
				}
				const result = handleSpecialBlock(pendingMove, currentPlayer, isCorrect);
				if (result?.extraTurn) extraTurnTriggered = true;
			}

			// Increment score on correct answer
			setScores((prev) => ({
				...prev,
				[currentPlayer]: prev[currentPlayer] + 1,
			}));
		}

		closeQuestionModal();

		// Switch turns unless it's a 6 or extra turn was triggered
		if (diceValue === 6 || extraTurnTriggered) return;
		switchTurn();
	};

	/** ⏳ Timeout Handling */
	const handleTimeout = () => {
		closeQuestionModal();
		if (diceValue === 6) return;
		switchTurn();
	};

	/** Close modal & reset */
	const closeQuestionModal = () => {
		setShowQuestion(false);
		setCurrentQuestionIndex((prev) => prev + 1);
		setPendingMove(null);
		stopTimer();
		setFlippedQuestionActive(false);
		setShowFlipped(false);
	};

	/** 🔹 Handle Special Blocks */
	const handleSpecialBlock = (pos, player, answeredCorrectly = true) => {
		const special = specialBlocks[pos];
		if (!special) return;

		showPopup(
			special.type.charAt(0).toUpperCase() + special.type.slice(1),
			special.message
		);

		switch (special.type) {
			case "skipTurn":
				// Give extra turn to the opponent
				const opponent = player === "p1" ? "p2" : "p1";
				setExtraChance((prev) => ({ ...prev, [opponent]: prev[opponent] + 1 }));
				break;

			case "move":
				if (special.color === "red" || answeredCorrectly) {
					const newPos = Math.max(1, pos + special.value);
					setPositions((prev) => ({ ...prev, [player]: newPos }));
				}
				break;

			case "extraTurn":
				if (answeredCorrectly) {
					setExtraChance((prev) => ({ ...prev, [player]: prev[player] + 1 }));
				}
				break;

			case "flipQuestion":
				if (answeredCorrectly) {
					setFlippedQuestionActive(true);
					setShowFlipped(false);
				}
				break;
		}
	};

	/** 🔄 Switch Player Turn with Extra Chance Consumption */
	const switchTurn = () => {
		const nextPlayer = currentPlayer === "p1" ? "p2" : "p1";

		// First check if next player should be skipped
		if (skipTurn[nextPlayer]) {
			setSkipTurn((prev) => ({ ...prev, [nextPlayer]: false }));
			// Give turn to current player
			if (extraChance[currentPlayer] > 0) {
				setExtraChance((prev) => ({
					...prev,
					[currentPlayer]: prev[currentPlayer] - 1,
				}));
			}
			return; // Keep current player's turn
		}

		// Then check for extra chances
		if (extraChance[currentPlayer] > 0) {
			setExtraChance((prev) => ({
				...prev,
				[currentPlayer]: prev[currentPlayer] - 1,
			}));
			return; // Keep current player's turn
		}

		// If no skip or extra chance, switch normally
		setCurrentPlayer(nextPlayer);
		setDiceValue(null);
		setPendingMove(null);
		resetTimer();
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
          ${!special && "bg-white text-black"}`}
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

	/** ✅ Show Popup Helper */
	const showPopup = (title, description) => {
		setPopup({ visible: true, title, description });
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
						{currentPlayer === "p1" ? "Team Prithu" : "Team Brahma"}
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
					<div className="bg-white p-6 rounded-xl shadow-2xl w-full text-black mx-[2em]">
						<h2 className="font-bold text-2xl mb-4">
							Question (
							{answeringPlayer === "p1" ? "Team Prithu" : "Team Brahma"})
						</h2>

						{/* Timer */}
						<div className="mb-4 flex items-center justify-between">
							<span className="text-xl font-bold text-red-600">⏱ {timer}s</span>
							<div className="flex gap-3">
								{flippedQuestionActive && (
									<button
										onClick={() => setShowFlipped((prev) => !prev)}
										className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 flex items-center gap-2"
										title="Flip Question"
									>
										<Shuffle size={18} />
									</button>
								)}
								<button
									onClick={startTimer}
									className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
									title="Start Timer"
								>
									<Play size={20} />
								</button>
								<button
									onClick={stopTimer}
									className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
									title="Stop Timer"
								>
									<Square size={20} />
								</button>
								<button
									onClick={resetTimer}
									className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
									title="Reset Timer"
								>
									<RotateCcw size={20} />
								</button>
							</div>
						</div>

						{/* Question Text */}
						<div className="mb-4">
							{flippedQuestionActive && showFlipped ? (
								<>
									<p className="text-2xl text-black">
										In text 39, who is the supreme teacher?
									</p>
									<p className="text-2xl text-black mt-1">
										श्लोक 39 में, सर्वोच्च गुरु कौन हैं?
									</p>
								</>
							) : (
								<>
									<p className="text-2xl text-black">
										{questions[currentQuestionIndex]?.q}
									</p>
									<p className="text-2xl text-black mt-1">
										{questions[currentQuestionIndex]?.qHindi}
									</p>
								</>
							)}
						</div>

						{/* Answer Section */}
						<div className="mb-4">
							<details className="bg-yellow-100 rounded p-3">
								<summary className="cursor-pointer font-semibold text-yellow-800 text-lg">
									Reveal Answer
								</summary>
								<div className="mt-4 max-h-40 overflow-y-auto text-black">
									{flippedQuestionActive && showFlipped ? (
										<>
											<p className="text-xl">Lord Brahma.</p>
											<p className="text-xl mt-2">भगवान ब्रह्मा।</p>
										</>
									) : (
										<>
											<p className="text-xl">
												{questions[currentQuestionIndex]?.ans ||
													"No answer provided."}
											</p>
											<p className="text-xl mt-2">
												{questions[currentQuestionIndex]?.ansHindi ||
													"उत्तर उपलब्ध नहीं।"}
											</p>
										</>
									)}
								</div>
							</details>
						</div>

						{/* Action Buttons */}
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
							<button
								onClick={handleTimeout}
								className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
							>
								Timeout
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Popup */}
			{popup.visible && (
				<div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg border border-cyan-500 w-80 z-50">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-bold text-lg">{popup.title}</h3>
							<p className="text-sm mt-1">{popup.description}</p>
						</div>
						<button onClick={() => setPopup({ ...popup, visible: false })}>
							<X size={20} className="text-gray-400 hover:text-white" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
