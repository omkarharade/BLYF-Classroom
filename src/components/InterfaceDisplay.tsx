"use client";

import React, { useEffect, useState } from "react";

const InterfaceDisplay = (props: any) => {
	const [qNumber, setQNumber] = useState(0);
	const optionColorBlue =
		"flex flex-row w-[rem] py-[1rem] px-[1rem] font-sans text-xl font-medium  bg-sky-200 hover:bg-sky-700 border-2 hover:text-white border-sky-500";

	const optionColorRed =
		"flex flex-row w-[rem] py-[1rem] px-[1rem] font-sans text-xl font-medium  bg-red-200 hover:bg-red-700 border-2 hover:text-white border-red-500";
	const optionColorGreen =
		"flex flex-row w-[rem] py-[1rem] px-[1rem] font-sans text-xl font-medium  bg-green-200 hover:bg-green-700 border-2 hover:text-white border-green-500";

	const [optionJudge1, setOptionJudge1] = useState(optionColorBlue);
	const [optionJudge2, setOptionJudge2] = useState(optionColorBlue);
	const [optionJudge3, setOptionJudge3] = useState(optionColorBlue);
	const [optionJudge4, setOptionJudge4] = useState(optionColorBlue);

	function prevPage() {
		if (qNumber === 0) return;
		else {
			setQNumber((prev) => prev - 1);
		}
	}

	function nextPage() {
		if (qNumber >= 14) return;
		else setQNumber((prev) => prev + 1);
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		console.log(event.key);

		if (event.key === "ArrowRight") {
			nextPage();
		} else if (event.key === "ArrowLeft") {
			prevPage();
		} else {
			return;
		}
	};

	useEffect(() => {
		setOptionJudge1(optionColorBlue);
		setOptionJudge2(optionColorBlue);
		setOptionJudge3(optionColorBlue);
		setOptionJudge4(optionColorBlue);

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [qNumber]);

	function optionCheck1(selectedAnswer: string, rightAnswer: string) {
		if (optionJudge1 !== optionColorBlue) return;

		if (selectedAnswer === rightAnswer) {
			setOptionJudge1(optionColorGreen);
		} else {
			setOptionJudge1(optionColorRed);
		}
	}

	function optionCheck2(selectedAnswer: string, rightAnswer: string) {
		if (optionJudge2 !== optionColorBlue) return;

		if (selectedAnswer === rightAnswer) {
			setOptionJudge2(optionColorGreen);
		} else {
			setOptionJudge2(optionColorRed);
		}
	}

	function optionCheck3(selectedAnswer: string, rightAnswer: string) {
		if (optionJudge3 !== optionColorBlue) return;

		if (selectedAnswer === rightAnswer) {
			setOptionJudge3(optionColorGreen);
		} else {
			setOptionJudge3(optionColorRed);
		}
	}

	function optionCheck4(selectedAnswer: string, rightAnswer: string) {
		console.log(selectedAnswer === rightAnswer);
		if (optionJudge4 !== optionColorBlue) return;

		if (selectedAnswer === rightAnswer) {
			setOptionJudge4(optionColorGreen);
		} else {
			setOptionJudge4(optionColorRed);
		}

		console.log("optionJudge4", optionJudge4);
	}

	return (
		<div className="w-full  max-w-screen-xl h-full bg-orange-100  mx-auto flex flex-col justify-between">
			<div>
				{/* question sub header */}
				<div className="w-[100%] px-[1rem] py-2 sm:flex-row  flex flex-col items-center  justify-between bg-sky-200 border-2 border-sky-500 ">
					<h2 className="text-base sm:text-lg md:text-xl font-mono font-bold bg-yellow-300 w-fit px-2">
						{props.data.name}
					</h2>
					<h2 className="text-lg md:text-xl font-mono">
						Question - {qNumber + 1}
					</h2>
					<div></div>
				</div>

				{/* question text div */}
				<div className="flex justify-center h-[10rem] overflow-y-scroll  min-w-[20rem] mx-auto mt-[3rem]">
					<div className="min-w-[20rem] w-[90%]  px-[2rem] py-[1rem] text-xl md:text-2xl">
						{props.data.questions[qNumber].questionText}
					</div>
				</div>
			</div>

			{/* options div */}
			<div className="mx-auto w-[95%] mb-[1rem] mt-[2rem]">
				{/* option -1 */}
				<div
					onClick={() => {
						optionCheck1(
							props.data.questions[qNumber].options[0],
							props.data.questions[qNumber].correctAnswer
						);
					}}
					className={optionJudge1}
				>
					<p className="pe-[1rem]">{"A)"}</p>
					<p className="font-sans text-lg  md:text-xl font-medium">
						{props.data.questions[qNumber].options[0]}
					</p>
				</div>

				{/* option -2 */}
				<div
					onClick={() => {
						optionCheck2(
							props.data.questions[qNumber].options[1],
							props.data.questions[qNumber].correctAnswer
						);
					}}
					className={optionJudge2}
				>
					<p className="pe-[1rem]">{"B)"}</p>
					<p className="font-sans text-lg  md:text-xl font-medium">
						{props.data.questions[qNumber].options[1]}
					</p>
				</div>

				{/* option -3 */}
				<div
					onClick={() => {
						optionCheck3(
							props.data.questions[qNumber].options[2],
							props.data.questions[qNumber].correctAnswer
						);
					}}
					className={optionJudge3}
				>
					<p className="pe-[1rem]">{"C)"}</p>
					<p className="font-sans text-lg  md:text-xl font-medium">
						{props.data.questions[qNumber].options[2]}
					</p>
				</div>

				{/* option-4 */}
				<div
					onClick={() => {
						optionCheck4(
							props.data.questions[qNumber].options[3],
							props.data.questions[qNumber].correctAnswer
						);
					}}
					className={optionJudge4}
				>
					<p className="pe-[1rem]">{"D)"}</p>
					<p className="font-sans text-lg  md:text-xl font-medium">
						{props.data.questions[qNumber].options[3]}
					</p>
				</div>
			</div>

			<div className="flex flex-row justify-between h-[2rem] mx-[1rem] md:mx-[2.5rem] my-[2rem]">
				<div>
					<a
						className="py-2 px-[1.5rem] bg-red-500 hover:bg-red-700 text-white text-lg text-center font-mono font-bold rounded-md border-2 border-red-600"
						href="/assessments"
					>
						Exit
					</a>
				</div>

				<div className="">
					<a
						onClick={prevPage}
						className="mx-[1rem]  py-2 px-2  bg-slate-200 hover:bg-sky-800 hover:text-white  text-black text-lg text-center font-mono font-bold rounded-md border-2 border-sky-600"
					>
						previous
					</a>

					<a
						onClick={nextPage}
						className="py-2 px-[1.5rem] bg-sky-600 hover:bg-sky-800 text-white text-lg text-center font-mono font-bold rounded-md border-2 border-sky-600"
					>
						Next
					</a>
				</div>
			</div>
		</div>
	);
};

export default InterfaceDisplay;
