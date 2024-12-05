"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
import { BsBook, BsCalendarDay, BsFillQuestionCircleFill } from "react-icons/bs"

export default function Home() {

	return (
		<div className="flex flex-col w-[100%] bg-orange-100 justify-center items-center">

			{/* navbar  */}

			<div className=" flex flex-row w-[95%] px-4 py-4 my-5 border rounded-xl bg-orange-200 justify-between items-center">

				<h1 className="text-2xl font-extrabold italic ">BLYF Classroom</h1>
				<div>
					<Link className="px-10 text-orange-600 hover:text-black" href="/assessments">Assessments</Link>
					<Link className="px-10 text-orange-600 hover:text-black" href="/about">About Us</Link>

				</div>
			</div>

			{/* intro heading with a photograph half half  */}

			<div className="flex flex-row mt-10">
				
				{/* image */}
				<div className="w-1/2">
				<Image
					src="/Krishna-Arjun-img.jpg"
					width={400}
					height={400}
					alt="Picture of the author"
				/>
				</div>
				{/* text */}

				<div className="w-1/2 flex flex-col justify-center">
				<h1 className=" font-bold text-4xl my-10">Dive right into the ancient wisdom texts</h1>
				<p> Emerging from the land of Bharat spreading light across the globe, learn and tap into reality of existence</p>
				</div>
			</div>

			{/* 3 main features with a icon representing it  */}

			<div className="flex flex-col items-center md:justify-evenly md:flex-row bg-orange-950 w-[100%] h-fit py-10 mt-10">

				<div>
					<BsBook size={100} color="orange"/>
					<p className="text-orange-400 text-xl font-extrabold font-mono py-2">Scriptural Studies</p>
				</div>

				<div>
					<BsFillQuestionCircleFill size={100} color="orange"/>
					<p className="text-orange-400 text-xl font-extrabold font-mono py-2">Quiz sessions</p>
				</div>

				<div>
					<BsCalendarDay size={100} color="orange"/>
					<p className="text-orange-400 text-xl font-extrabold font-mono py-2">Weekly Classes</p>
				</div>

			</div>

			 {/* check the assessment page section with button  */}

			<div className="w-[100%] h-fit flex  flex-col items-center pt-20">

				<p className="text-2xl">Explore the assessments for the latest Bhagvat Geeta sessions conducted every saturday</p>

				<Link className="my-10 bg-orange-400 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-3xl" href={"/assessments"}> Click Here</Link>
			</div>


			{/* footer */}

			<div className="w-[100%] text-white bg-black">
				<p className="flex justify-self-center py-10"> Made with devotion ❤ by BLYF </p>
			</div>


		</div>
	);
}
