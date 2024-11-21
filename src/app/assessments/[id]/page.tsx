import React, { useEffect, useState } from "react";
import assesmentJson from "../../../../public/questions.json";
import InterfaceDisplay from "@/components/InterfaceDisplay";

export default async function Interface({
	params,
}: {
	params: Promise<{ id: number }>;
}) {
	const data = assesmentJson.assessments[0].classes;
	const id = (await params).id;

	return (
		<>
			<div className="min-w-[24rem] min-h-fit h-screen  w-[97%] bg-slate-100 mx-auto  py-[1rem] px-[1.5rem]">
				<InterfaceDisplay data={data[id]} />
			</div>
		</>
	);
}
