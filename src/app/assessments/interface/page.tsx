"use client";

import React, { useEffect, useState } from "react";
import assesmentJson from "../../../../public/questions.json";

export default function Interface() {
	const data = assesmentJson.assessments[0].classes;

	return (
		<>
			<div className=" min-w-[40rem] w-[97%] bg-slate-100 min-h-[100rem] h-max mx-auto mt-[2rem] py-[1.5rem] px-[1.5rem]">
				<Display data={data[0]} />
			</div>
		</>
	);
}

const Display = (props: any) => {
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

	useEffect(() => {
		setOptionJudge1(optionColorBlue);
		setOptionJudge2(optionColorBlue);
		setOptionJudge3(optionColorBlue);
		setOptionJudge4(optionColorBlue);
	}, [qNumber]);

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
		<div>
			<div className="w-full bg-orange-100 min-h-[40rem] mx-auto flex flex-col justify-between">
				<div>
					{/* question sub header */}
					<div className="w-[100%] px-[1rem] py-2 flex flex-row justify-between bg-sky-200 border-2 border-sky-500 ">
						<h2 className="text-xl font-mono font-bold bg-yellow-300 w-fit px-2">
							{props.data.name}
						</h2>
						<h2 className="text-xl font-mono"> Question - {qNumber + 1}</h2>
						<div></div>
					</div>

					{/* question text div */}
					<div className="flex justify-center h-[15rem] overflow-y-scroll  min-w-[30rem] mx-auto mt-[3rem]">
						<div className="min-w-[30rem] w-[90%]  px-[2rem] py-[1rem] text-2xl">
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
						<p className="font-sans text-xl font-medium">
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
						<p className="font-sans text-xl font-medium">
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
						<p className="font-sans text-xl font-medium">
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
						<p className="font-sans text-xl font-medium">
							{props.data.questions[qNumber].options[3]}
						</p>
					</div>
				</div>

				<div className="flex flex-row justify-between h-[2rem] mx-[2.5rem] my-[2rem]">
					<div>
						<a
							className="py-2 px-2 bg-red-500 hover:bg-red-700 text-white text-lg text-center font-mono font-bold rounded-md"
							href="/assessments"
						>
							Exit
						</a>
					</div>

					<div className="">
						<a
							onClick={prevPage}
							className="mx-[1rem]  py-2 px-2 w-[3rem] bg-slate-200 hover:bg-sky-800 hover:text-white  text-black text-lg text-center font-mono font-bold rounded-md border-2 border-sky-600"
						>
							previous
						</a>

						<a
							onClick={nextPage}
							className="py-2 px-2 bg-sky-600 hover:bg-sky-800 text-white text-lg text-center font-mono font-bold rounded-md "
						>
							Next
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
