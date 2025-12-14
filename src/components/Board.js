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
	const [positions, setPositions] = useState({ p1: 64, p2: 34 });
	const [currentPlayer, setCurrentPlayer] = useState("p1");
	const [diceValue, setDiceValue] = useState(null);
	const [rolling, setRolling] = useState(false);

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
	const [extraMoveCount, setExtraMoveCount] = useState({ p1: 0, p2: 0 });
	const [oppositeAnswerPending, setOppositeAnswerPending] = useState(null); // { pos, player, opponent, value }
	const [flippedQuestionActive, setFlippedQuestionActive] = useState(false);
	const [flippedQuestionData, setFlippedQuestionData] = useState(null);
	const [flippedShowing, setFlippedShowing] = useState(false);
  const rollbackStepsRef = useRef({ p1: 0, p2: 0 });
  const extraTurnCountRef = useRef({ p1: 0, p2: 0 });
  const isQuestionModalDisabledRef = useRef(false);
  const diceValueRef = useRef(null);
  const pendingMultiMoveRef = useRef({ p1: 0, p2: 0 });
  const isRollbackStepsDisabledRef = useRef({p1: false, p2: false});
  const [pendingMultiMove, setPendingMultiMove] = useState({ p1: 0, p2: 0 });



  useEffect(() => {


    console.log("called pendingMultiMoveRef useEffect with current player: ", currentPlayer);
    console.log("pendingMultiMoveRef current value: ", pendingMultiMoveRef.current);

    if(pendingMultiMoveRef.current[currentPlayer] === 0){
      console.log("No pending multi moves for any player.");
      return;
    }


    if(pendingMultiMoveRef.current){
      console.log("pendingMultiMoveRef current value changed: ", pendingMultiMoveRef.current);
    }

    if(pendingMultiMoveRef.current[currentPlayer] > 0){

      rollbackStepsRef.current[currentPlayer] = 1;

      console.log("Player ", currentPlayer, " has pending multi moves: ", pendingMultiMoveRef.current[currentPlayer]);

      setTimeout(() => {

        setPositions((prev) => {
          const currentPos = prev[currentPlayer];
          let newPos = currentPos + 1;

          if(newPos > 100){
            newPos = 100;
          }

          console.log("Moving player ", currentPlayer, " to new position: ", newPos);
          return { ...prev, [currentPlayer]: newPos };
        });

      }, 4000);

      showQuestionModal();

    }

  }, [pendingMultiMove]);


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

	const handleSkipTurn = (newPos, player, stepCount, skipCount) => {


    /**
     * player move by 1 step only 
     */

    const specialAppliedPos = Math.min(100, newPos + stepCount);

    /**
     * update position state with special applied position
     */

    setTimeout(() => {

      setPositions((prev) => ({ ...prev, [player]: specialAppliedPos }));

    }, 4000)


    /**
     * the player misses next turn, effectively giving opponent an extra turn
     */

    const opponent = player === "p1" ? "p2" : "p1";

    /**
     * adding extra turn count to opponent
     */
    extraTurnCountRef.current[opponent] = skipCount;

  };

	const handleAnswerToMove = (newPos, player, questionsCount, stepCount) => {

    pendingMultiMoveRef.current[player] = questionsCount;
    setPendingMultiMove((prev) => ({ ...prev, [player]: questionsCount }));
    isQuestionModalDisabledRef.current = true;

  };

	const handleAnswerForOppositeTeam = (newPos, player, stepCount) => {

    setTimeout(() => {

      const specialCaseAppliedPos = Math.min(100, newPos + stepCount);

      setPositions((prev) => ({ ...prev, [player]: specialCaseAppliedPos }));

    }, 4000);


    const opponent = player === "p1" ? "p2" : "p1";

    isRollbackStepsDisabledRef.current[opponent] = true;


  };

	const handleAnswerTwoAndMove = (newPos, player) => {};

	const handleFlipTheQuestion = (newPos, player, questionsRequired, value) => {};

	const handleExtraTurn = (newPos, player) => {

    isQuestionModalDisabledRef.current = true;

  };

	const handleOtherTeamAnswers = (newPos, player, stepCount) => {

    
    setTimeout(() => {

      const specialCaseAppliedPos = Math.min(100, newPos + stepCount);

      setPositions((prev) => ({ ...prev, [player]: specialCaseAppliedPos }));

    }, 4000);


    isRollbackStepsDisabledRef.current[player] = true;


  };

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
				handleSkipTurn(newPos, player, special?.stepCount || 0, special?.skipCount || 1);
        
				break;

			case "answerToMove":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Answer to Move block hit");

				/**
				 * handle the answer to move special effect
				 */
				handleAnswerToMove(newPos, player, special.questionsCount || 0, special?.stepCount || 0);
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
				handleAnswerForOppositeTeam(newPos, player, special?.stepCount);
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
				handleAnswerTwoAndMove(newPos, player);
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
					newPos,
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
				handleExtraTurn(newPos, player);
				break;

			case "otherTeamAnswers":
				/**
				 * show popup for special block landed
				 */
				showPopup("Special", special.message || "Other Team Answers block hit");

				/**
				 * handle the other team answers special effect
				 */
				handleOtherTeamAnswers(newPos, player, special?.stepCount || 0);
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


    const special = specialBlocks?.[newPos];

    if(special){

      if(special?.color === "red"){

        /**
         * if the special block is red
         */

        if(special?.stepCount && special.stepCount > 0){
          rollbackStepsRef.current[player] = special.stepCount;
        }
        else {
          rollbackStepsRef.current[player] = 0;
        }

      }
      else {

        /**
         * if the special block is blue
         */

        if(special?.stepCount){

          rollbackStepsRef.current[player] = special.stepCount;

        }
        else {
          rollbackStepsRef.current[player] = diceValue;
        }
      }
    }
    else{

      /**
       * if there is no special block, the rollback steps will be equal to the dice value
       */

      console.log("No special block landed, setting rollback steps to dice value: ", diceValueRef.current);
      rollbackStepsRef.current[player] = diceValueRef.current;

      console.log("rollbackStepsRef current value: ", rollbackStepsRef.current);
    }

		processSpecialEffect(newPos, player);
	};

  const showQuestionModal = () => {

    /**
     * show question modal after a short delay to allow for dice animation to complete
     * and player movement to be visually perceived
     * 
     * then question modal appears
     */
    setTimeout(() => {
      setShowQuestion(true);
    }, 7000);

  }

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
				// const finalRoll = Math.floor(Math.random() * 6) + 1;
				const finalRoll = 3;
				setDiceValue(finalRoll);
				diceValueRef.current = finalRoll;

        

        setRolling(false);

        /**
         * calculate new position for the current player
         */

				let newPos = positions[currentPlayer] + finalRoll;
				if (newPos > 100) newPos = 100;

				/**
				 * move the current player on UI by setting the positions useState
				 */

				setTimeout(() => {
					/**
					 * keeping a delay to allow for dice animation to complete
					 * and show the movement of the player piece on the board
					 */
					setPositions((prev) => ({ ...prev, [currentPlayer]: newPos }));
				}, 4000);




				/**
				 * check if the current player have extra turn pending
				 * if yes, decrement the extra turn count and keep the same player's turn
				 */

				if ((extraTurnCountRef.current[currentPlayer] || 0) > 0) {
					extraTurnCountRef.current[currentPlayer] = extraTurnCountRef.current[currentPlayer] - 1;

          return;
				}

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
						showPopup("Rolled a 6", "You moved and get another turn!");
					}, 800);

					return;
				}

				// Non-6 -> prepare pending move and show question modal after animation
				setTimeout(() => {

					/**
					 * check if the current player landed on a special block
					 * if yes, process the special effect
					 */

					processPlayerMovement(currentPlayer, newPos);

					/**
					 * after processing special effect, show question modal
					 */

					
          if(!isQuestionModalDisabledRef.current){
            showQuestionModal();
          }
          else{
            isQuestionModalDisabledRef.current = false;
          }
				}, 100);
			}
		}, 300);
	};

	/** Switch turn logic taking into account skip / extraChance */
	const switchTurn = () => {
		const nextPlayer = currentPlayer === "p1" ? "p2" : "p1";

		// // if opponent must be skipped, keep current player (clear skip flag)
		// if (skipTurn[nextPlayer]) {
		// 	setSkipTurn((prev) => ({ ...prev, [nextPlayer]: false }));
		// 	showPopup("Skip Applied", `${nextPlayer} missed their turn`);
		// 	// keep currentPlayer same
		// 	setDiceValue(null);
		// 	resetTimer();
		// 	return;
		// }

		// // If current player has an extra chance, consume and keep turn
		// if ((extraChance[currentPlayer] || 0) > 0) {
		// 	setExtraChance((prev) => ({
		// 		...prev,
		// 		[currentPlayer]: prev[currentPlayer] - 1,
		// 	}));
		// 	showPopup("Extra Turn", "Using your extra turn!");
		// 	setDiceValue(null);
		// 	resetTimer();
		// 	return;
		// }


		// Normal switch
		setCurrentPlayer(nextPlayer);
		setDiceValue(null);
		resetTimer();
	};

	/** ✅ Handle Answer - for non-6 moves (questions shown only for non-6)
	 *  Supports: deferred special processing, multiQuestion requirements, opposite team answering, flip question display.
	 */
	const handleAnswer = (isCorrect) => {
		

    /**
     * set the current question index to next question 
     */
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length));

    /**
     * reset the timer 
     */
    setTimer(30);
    setIsTimerRunning(false);


    /**
     * if correct, close question modal and switch turn
     */
    if(isCorrect){

    }
    else {

      /**
       * if incorrect, there is some steps rollback to be done
       */

      let stepsToRollback = rollbackStepsRef.current[currentPlayer] || 0;


      /**
       * if rollback steps is disabled for this turn, set it to 0
       */
      if(isRollbackStepsDisabledRef.current[currentPlayer]){
        stepsToRollback = 0;
        isRollbackStepsDisabledRef.current[currentPlayer] = false;
      }


      setTimeout(() => {

        console.log("Rolling back ", stepsToRollback, " steps for ", currentPlayer);


        setPositions((prev) => {
        const currentPos = prev[currentPlayer];
        const newPos = Math.max(1, currentPos - stepsToRollback);

        console.log("New position after rollback: ", newPos);
        console.log("positions object before rollback ==> ",prev);
        console.log("positions object after rollback ==> ", { ...prev, [currentPlayer]: newPos });
        return { ...prev, [currentPlayer]: newPos };
      });

      }, 4000);


      /**
       * close question modal and switch turn
       */

    }

    closeQuestionModal();

    /**
     * check if there are pending multi moves for the player
     * if yes, decrement the pending multi move count
     * and do not switch turn
     */

    if((pendingMultiMoveRef.current[currentPlayer] || 0) > 0){
      pendingMultiMoveRef.current[currentPlayer] = Math.max(0, (pendingMultiMoveRef.current[currentPlayer] || 0) - 1);

      setPendingMultiMove((prev) => ({
        ...prev,
        [currentPlayer]: Math.max(0, (prev[currentPlayer] || 0) - 1)
      }));

      
      if(pendingMultiMoveRef.current[currentPlayer] === 0){
        switchTurn();
        diceValueRef.current = 0;
      }
    }

    else {
      switchTurn();
      diceValueRef.current = 0;
    }
	};

	/** ⏳ Timeout Handling - treat as incorrect and switch turn */
	const handleTimeout = () => {



    /**
       * if timed out , there is some steps rollback to be done
       */

      let stepsToRollback = rollbackStepsRef.current[currentPlayer] || 0;


      /**
       * if rollback steps is disabled for this turn, set it to 0
       */
      if(isRollbackStepsDisabledRef.current[currentPlayer]){
        stepsToRollback = 0;
        isRollbackStepsDisabledRef.current[currentPlayer] = false;
      }


      setTimeout(() => {

        console.log("Rolling back ", stepsToRollback, " steps for ", currentPlayer);


        setPositions((prev) => {
        const currentPos = prev[currentPlayer];
        const newPos = Math.max(1, currentPos - stepsToRollback);

        console.log("New position after rollback: ", newPos);
        console.log("positions object before rollback ==> ",prev);
        console.log("positions object after rollback ==> ", { ...prev, [currentPlayer]: newPos });
        return { ...prev, [currentPlayer]: newPos };
      });

      }, 4000);


      /**
       * close question modal and switch turn
       */


    closeQuestionModal();

    if((pendingMultiMoveRef.current[currentPlayer] || 0) > 0){
      pendingMultiMoveRef.current[currentPlayer] = Math.max(0, (pendingMultiMoveRef.current[currentPlayer] || 0) - 1);

      
      setPendingMultiMove((prev) => ({
        ...prev,
        [currentPlayer]: Math.max(0, (prev[currentPlayer] || 0) - 1)
      }));


      if(pendingMultiMoveRef.current[currentPlayer] === 0){
        switchTurn();
        diceValueRef.current = 0;
      }
    }

    else {
      switchTurn();
      diceValueRef.current = 0;
    }
	};

	/** Close modal & reset */
	const closeQuestionModal = () => {
		setShowQuestion(false);
		setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
		stopTimer();
    setTimer(30);
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
