"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
	useEffect(() => {
		redirect("/assessments");
	}, []);

	return (
		<div className="flex w-[100%] h-[10rem] bg-orange-300 justify-center items-center">
			<h1 className="font-extrabold text-xl">
				Please wait you are being directed . . . . .
			</h1>
		</div>
	);
}
