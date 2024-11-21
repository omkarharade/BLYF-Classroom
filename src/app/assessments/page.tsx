import React from "react";
import Link from "next/link";
import assesmentJson from "../../../public/questions.json";

export default function Quizzes() {
	const classes = assesmentJson.assessments[0].classes;

	return (
		// background div

		<div className=" flex flex-row  flex-wrap min-w-[20rem]  w-[95%] bg-slate-100 mx-auto my-[2rem] p-[2rem]">
			{classes.map((lecture: Object, i) => (
				<Card key={i} lecture={lecture} classNumber={i} />
			))}
		</div>
	);
}

const Card = (props: any) => {
	return (
		<div className=" flex flex-col justify-between m-[1rem]  w-[15rem] h-[12rem] p-4 bg-orange-100 border-2 border-orange-300">
			<h2 className="text-xl font-mono font-bold bg-yellow-300 w-fit px-2">
				{props.lecture.name}
			</h2>

			<div>
				<p className="font-sans text-base px-1">
					{props.lecture["sub-heading"]}
				</p>
				<p className="font-sans text-base px-1">
					No. of Questions - {props.lecture.count}
				</p>
			</div>

			<Link
				href={{
					pathname: `/assessments/${props.classNumber}`,
				}}
				className="w-full bg-sky-600 hover:bg-sky-800 no-underline py-2 px-2 text-white text-lg text-center font-mono font-bold rounded-md"
			>
				Enter Assessment
			</Link>
		</div>
	);
};
