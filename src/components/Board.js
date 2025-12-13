"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Square, RotateCcw, X } from "lucide-react";

export default function DiceBoard({
	questions = [],
	playerScores = { p1: 0, p2: 0 },
	specialBlocks = {},
}) {
	// basic game state
	const [positions, setPositions] = useState({ p1: 1, p2: 1 });
	const [currentPlayer, setCurrentPlayer] = useState("p1");
	const [diceValue, setDiceValue] = useState(null);
	const [rolling, setRolling] = useState(false);
	const [pendingMove, setPendingMove] = useState(null);

	// question modal state
	const [showQuestion, setShowQuestion] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [scores, setScores] = useState(playerScores);

	// popup (kept minimal)
	const [popup, setPopup] = useState({
		visible: false,
		title: "",
		description: "",
	});
	const showPopup = (title, description) =>
		setPopup({ visible: true, title, description });

	/** ---------------- TIMER STATES ---------------- */
	const [timer, setTimer] = useState(30);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		if (isTimerRunning && timer > 0) {
			timerRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
		} else if (timer === 0) {
			clearInterval(timerRef.current);
			setIsTimerRunning(false);
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

	/** ---------------- Special-case states ---------------- */
	const [deferredSpecial, setDeferredSpecial] = useState(null); // when landing via 6 on requiresAnswer special
	const [extraChance, setExtraChance] = useState({ p1: 0, p2: 0 });
	const [skipTurn, setSkipTurn] = useState({ p1: false, p2: false });
	const [multiQuestionReq, setMultiQuestionReq] = useState({ p1: 0, p2: 0 });
	const [pendingMultiMove, setPendingMultiMove] = useState({ p1: 0, p2: 0 });
	const [oppositeAnswerPending, setOppositeAnswerPending] = useState(null); // { pos, player, opponent, value }
	const [flippedQuestionActive, setFlippedQuestionActive] = useState(false);
	const [flippedQuestionData, setFlippedQuestionData] = useState(null);
	const [flippedShowing, setFlippedShowing] = useState(false);

	/** ------------------ Special handlers (modular) ------------------ */

	const handleMove = (newPos, player, stepCount) => {
		/**
		 * calculate special effect applied position
		 * to new position
		 */

		const specialAppliedPos = Math.min(100, newPos + stepCount);


    /**
     * update position state with special applied position
     */

    setTimeout(() => {

      setPositions((prev) => ({ ...prev, [player]: specialAppliedPos }));


    }, 4000)

	};

	const handleSkipTurn = (pos, player) => {};

	const handleAnswerToMove = (pos, player, value) => {};

	const handleAnswerForOppositeTeam = (pos, player) => {};

	const handleAnswerTwoAndMove = (pos, player) => {};

	const handleFlipTheQuestion = (pos, player, questionsRequired, value) => {};

	const handleExtraTurn = (pos, player, value) => {};

	const handleOtherTeamAnswers = (pos, player, value) => {};

	/**
	 * Centralized processor for special effects.
	 * sourceWasSix: when true, if special.requiresAnswer === true, defer handling.
	 */
	const processSpecialEffect = (newPos, player) => {
		const special = specialBlocks?.[newPos];
		if (!special) return;

		switch (special.type) {
			case "move":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Move block hit");

				/**
				 * handle the move special effect
				 */
				handleMove(newPos, player, special?.stepCount || 0);
				break;

			case "skipTurn":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Skip Turn block hit");

				/**
				 * handle the skip turn special effect
				 */
				handleSkipTurn(pos, player);
				break;

			case "answerToMove":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Answer to Move block hit");

				/**
				 * handle the answer to move special effect
				 */
				handleAnswerToMove(pos, player, special.value);
				break;

			case "answerForOppositeTeam":
				/**
				 * show popup for special block landed
				 */
				showPopup(
					"Special",
					special.message || "Answer for Opposite Team block hit"
				);

				/**
				 * handle the answer for opposite team special effect
				 */
				handleAnswerForOppositeTeam(pos, player);
				break;

			case "answerTwoAndMove":
				/**
				 * show popup for special block landed
				 */
				showPopup(
					"Special",
					special.message || "Answer Two and Move block hit"
				);

				/**
				 * handle the answer two and move special effect
				 */
				handleAnswerTwoAndMove(pos, player);
				break;
			case "flipTheQuestion":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Flip the Question block hit");

				/**
				 * handle the flip the question special effect
				 */
				handleFlipTheQuestion(
					pos,
					player,
					special.questionsRequired,
					special.value
				);
				break;
			case "extraTurn":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Extra Turn block hit");

				/**
				 * handle the extra turn special effect
				 */
				handleExtraTurn(pos, player, special.value);
				break;

			case "otherTeamAnswers":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Other Team Answers block hit");

				/**
				 * handle the other team answers special effect
				 */
				handleOtherTeamAnswers(pos, player, special.value);
				break;

			default:
				showPopup("Special", special.message || "Special block hit");
		}
	};

	/** ---------------- Integration points ---------------- */

	const processPlayerMovement = (player, newPos) => {
		/**
		 * function to check if the current player landed on a special block
		 * if yes, process the special effect
		 */

		processSpecialEffect(newPos, player);
	};

	// Roll Dice: 6 moves instantly and grants another roll; non-6 opens question modal
	const rollDice = () => {
		if (rolling || showQuestion) return;

		setRolling(true);
		let rollCount = 0;
		const rollInterval = setInterval(() => {
			setDiceValue(Math.floor(Math.random() * 6) + 1);
			rollCount++;

			/**
			 * after 10 rolls, stop and finalize the dice value
			 */
			if (rollCount > 10) {
				clearInterval(rollInterval);
				const finalRoll = Math.floor(Math.random() * 6) + 1;
				setDiceValue(finalRoll);

				let newPos = positions[currentPlayer] + finalRoll;
				if (newPos > 100) newPos = 100;

				/**
				 * move the current player on UI by setting the positions useState
				 */

				setPositions((prev) => ({ ...prev, [currentPlayer]: newPos }));
				setPendingMove(null);

				/**
				 * If it's a 6 -> move instantly, no question,
				 * keep same player's turn
				 *
				 */
				if (finalRoll === 6) {
					/**
					 * getting a 6 will invoke special effect "extraTurn"
					 * need to call it below,
					 *
					 * this functionality is pending
					 */

					/**
					 * small delay to finish dice animation and
					 * show a short popup, then allow next roll
					 */

					setTimeout(() => {
						setRolling(false);
						showPopup("Rolled a 6", "You moved and get another turn!");
					}, 800);

					return;
				}

				// Non-6 -> prepare pending move and show question modal after animation
				setPendingMove(newPos);
				setTimeout(() => {
					/**
					 * set rolling to false after dice animation
					 */
					setRolling(false);

					/**
					 * check if the current player landed on a special block
					 * if yes, process the special effect
					 */

					processPlayerMovement(currentPlayer, newPos);

					/**
					 * after processing special effect, show question modal
					 */

					// showQuestionModal();
				}, 100);
			}
		}, 300);
	};

	/** Switch turn logic taking into account skip / extraChance */
	const switchTurn = () => {
		const nextPlayer = currentPlayer === "p1" ? "p2" : "p1";

		// if opponent must be skipped, keep current player (clear skip flag)
		if (skipTurn[nextPlayer]) {
			setSkipTurn((prev) => ({ ...prev, [nextPlayer]: false }));
			showPopup("Skip Applied", `${nextPlayer} missed their turn`);
			// keep currentPlayer same
			setDiceValue(null);
			setPendingMove(null);
			resetTimer();
			return;
		}

		// If current player has an extra chance, consume and keep turn
		if ((extraChance[currentPlayer] || 0) > 0) {
			setExtraChance((prev) => ({
				...prev,
				[currentPlayer]: prev[currentPlayer] - 1,
			}));
			showPopup("Extra Turn", "Using your extra turn!");
			setDiceValue(null);
			setPendingMove(null);
			resetTimer();
			return;
		}

		// Normal switch
		setCurrentPlayer(nextPlayer);
		setDiceValue(null);
		setPendingMove(null);
		resetTimer();
	};

	/** ✅ Handle Answer - for non-6 moves (questions shown only for non-6)
	 *  Supports: deferred special processing, multiQuestion requirements, opposite team answering, flip question display.
	 */
	const handleAnswer = (isCorrect) => {
		// Determine which player the effect should apply to:
		// If oppositeAnswerPending exists and targets current player, the opponent answers for current player.
		// The effect (move) should apply to oppositeAnswerPending.player (the original landing player).
		let effectPlayer = currentPlayer;
		if (
			oppositeAnswerPending &&
			oppositeAnswerPending.player === currentPlayer
		) {
			effectPlayer = oppositeAnswerPending.player; // original player gets effect
		}

		// If current player currently has multi-question requirement, this answer counts toward it
		if ((multiQuestionReq[currentPlayer] || 0) > 0) {
			// decrement requirement if answered correctly
			if (isCorrect) {
				setMultiQuestionReq((prev) => {
					const remaining = Math.max(0, (prev[currentPlayer] || 0) - 1);
					const updated = { ...prev, [currentPlayer]: remaining };
					// if completed, apply the pending multi move
					if (remaining === 0) {
						const mv = pendingMultiMove[currentPlayer] || 0;
						if (mv !== 0) {
							handleMoveRelative(null, currentPlayer, mv);
							setPendingMultiMove((pm) => ({ ...pm, [currentPlayer]: 0 }));
						}
					}
					return updated;
				});
			}

			// if requirement still > 0, close modal and keep same player's turn? We'll switch turn after counting as per original design
			closeQuestionModal();
			// After these sub-questions, switch turn (consistent with existing flow)
			switchTurn();
			return;
		}

		// Normal non-multi-question flow:
		if (pendingMove !== null && isCorrect) {
			// apply movement to the effectPlayer (usually currentPlayer unless oppositeAnswer)
			setPositions((prev) => ({ ...prev, [effectPlayer]: pendingMove }));
			setScores((prev) => ({
				...prev,
				[effectPlayer]: (prev[effectPlayer] || 0) + 1,
			}));

			// process special at landing (non-6 source)
			processSpecialEffect(pendingMove, effectPlayer, false);
		}

		// If there was a deferred special from previous 6-land for this player, apply it now
		if (deferredSpecial && deferredSpecial.player === currentPlayer) {
			processSpecialEffect(deferredSpecial.pos, deferredSpecial.player, false);
			setDeferredSpecial(null);
		}

		// If oppositeAnswerPending existed and was applied, clear it
		if (
			oppositeAnswerPending &&
			oppositeAnswerPending.player === currentPlayer
		) {
			setOppositeAnswerPending(null);
		}

		// If flip-question data was active for this landing, clear it after answering
		setFlippedQuestionActive(false);
		setFlippedQuestionData(null);
		setFlippedShowing(false);

		closeQuestionModal();

		// After answering a non-6 move, switch turn to opponent (unless consumed by extraChance when switching)
		switchTurn();
	};

	/** ⏳ Timeout Handling - treat as incorrect and switch turn */
	const handleTimeout = () => {
		// If multiQuestion was active, decrement requirement (treat timeout as incorrect -> just decrement or keep)
		if ((multiQuestionReq[currentPlayer] || 0) > 0) {
			// treat as failed attempt; decrement anyway to progress
			setMultiQuestionReq((prev) => {
				const remaining = Math.max(0, (prev[currentPlayer] || 0) - 1);
				const updated = { ...prev, [currentPlayer]: remaining };
				if (remaining === 0) {
					const mv = pendingMultiMove[currentPlayer] || 0;
					if (mv !== 0) {
						handleMoveRelative(null, currentPlayer, mv);
						setPendingMultiMove((pm) => ({ ...pm, [currentPlayer]: 0 }));
					}
				}
				return updated;
			});

			closeQuestionModal();
			switchTurn();
			return;
		}

		closeQuestionModal();
		// clear oppositeAnswerPending if it applied to this question
		if (
			oppositeAnswerPending &&
			oppositeAnswerPending.player === currentPlayer
		) {
			setOppositeAnswerPending(null);
		}
		// apply deferred special only when next non-6 occurs (handled elsewhere)
		switchTurn();
	};

	/** Close modal & reset */
	const closeQuestionModal = () => {
		setShowQuestion(false);
		setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
		setPendingMove(null);
		stopTimer();
	};

	/** 🎨 Render Each Cell - simplified (no special colors rendering here) */
	const renderCell = (num) => {
		const isP1 = positions.p1 === num;
		const isP2 = positions.p2 === num;

		// show special marker if exists
		const special = specialBlocks[num];

		const baseClasses =
			"w-[3.5rem] h-[3.5rem] border relative flex items-center justify-center text-sm";
		const defaultBg = "bg-white text-black";
		const redBg = "bg-red-300 text-red-900 border-red-300";
		const blueBg = "bg-blue-300 text-blue-900 border-blue-300";

		const colorClass = special
			? special.color === "red"
				? redBg
				: special.color === "blue"
				? blueBg
				: defaultBg
			: defaultBg;

		return (
			<div
				key={num}
				className={`${baseClasses} ${colorClass}`}
				title={special?.message || ""}
			>
				<span className="text-xs font-semibold text-gray-700">{num}</span>

				{isP1 && (
					<div className="absolute top-0 left-0">
						<Image
							src="/images/board-piece.png"
							alt="Player 1"
							width={28}
							height={28}
							className="object-contain bg-lime-500 rounded-full"
						/>
					</div>
				)}
				{isP2 && (
					<div className="absolute bottom-0 right-0">
						<Image
							src="/images/board-piece.png"
							alt="Player 2"
							width={28}
							height={28}
							className="object-contain bg-purple-500 rounded-full"
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
			<div className="flex flex-col items-center gap-6 bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-2xl border border-cyan-500 w-72 text-white">
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
					disabled={rolling || showQuestion}
					className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg ${
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
					<div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl text-black mx-6">
						<h2 className="font-bold text-2xl mb-4">
							{currentPlayer === "p1" ? "Team Prithu" : "Team Brahma"} Question
						</h2>

						{/* Timer */}
						<div className="mb-4 flex items-center justify-between">
							<span className="text-xl font-bold text-red-600">⏱ {timer}s</span>
							<div className="flex gap-3">
								<button
									onClick={startTimer}
									className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
									title="Start Timer"
								>
									<Play size={18} />
								</button>
								<button
									onClick={stopTimer}
									className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
									title="Stop Timer"
								>
									<Square size={18} />
								</button>
								<button
									onClick={resetTimer}
									className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
									title="Reset Timer"
								>
									<RotateCcw size={18} />
								</button>
							</div>
						</div>

						{/* Question Text */}
						<div className="mb-4">
							<p className="text-2xl text-black">
								{flippedQuestionActive &&
								flippedShowing &&
								flippedQuestionData?.q
									? flippedQuestionData.q
									: questions[currentQuestionIndex]?.q}
							</p>
							<p className="text-2xl text-black mt-1">
								{flippedQuestionActive &&
								flippedShowing &&
								flippedQuestionData?.qHindi
									? flippedQuestionData.qHindi
									: questions[currentQuestionIndex]?.qHindi}
							</p>
						</div>

						{/* Flip / info */}
						<div className="mb-4 flex items-center gap-3">
							{flippedQuestionActive && flippedQuestionData && (
								<button
									onClick={() => setFlippedShowing((v) => !v)}
									className="px-3 py-1 bg-indigo-500 text-white rounded"
								>
									{flippedShowing ? "Show Original" : "Flip Question"}
								</button>
							)}

							{oppositeAnswerPending &&
								oppositeAnswerPending.player === currentPlayer && (
									<div className="text-sm bg-yellow-100 p-2 rounded">
										Note: The other team ({oppositeAnswerPending.opponent}) will
										answer this question for you.
									</div>
								)}
						</div>

						{/* Answer Section */}
						<div className="mb-4">
							<details className="bg-yellow-100 rounded p-3">
								<summary className="cursor-pointer font-semibold text-yellow-800 text-lg">
									Reveal Answer
								</summary>
								<div className="mt-4 max-h-40 overflow-y-auto text-black">
									<p className="text-xl">
										{questions[currentQuestionIndex]?.ans ||
											"No answer provided."}
									</p>
									<p className="text-xl mt-2">
										{questions[currentQuestionIndex]?.ansHindi ||
											"उत्तर उपलब्ध नहीं।"}
									</p>
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
							<button
								onClick={() => {
									setShowQuestion(false);
								}}
								className="px-4 py-2 bg-white border rounded"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Popup (kept for generic messages) */}
			{popup.visible && (
				<div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg border border-cyan-500 w-80 z-50">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-bold text-lg">{popup.title}</h3>
							<p className="text-sm mt-1">{popup.description}</p>
						</div>
						<button onClick={() => setPopup({ ...popup, visible: false })}>
							<X size={18} className="text-gray-400 hover:text-white" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
