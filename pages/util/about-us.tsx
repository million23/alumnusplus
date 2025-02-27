import { AnimPageTransition } from "@/lib/animations";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";

const thePeople = [
	{
		name: "Gabrielle D. Napoto",
		img: "/profile/gabie-new.webp",
		position: "Project Manager",
	},
	{
		name: "Gerald T. Chavez",
		img: "/profile/gerald.png",
		position: "Principal Engineer (Wicket)",
	},
	{
		name: "Edriane D. Barcita",
		img: "/profile/edz.png",
		position: "Principal Engineer (Metaverse)",
	},
	{
		name: "Carlo L. Diaz",
		img: "/profile/carlo.jpeg",
		position: "Front-end Developer",
	},
	{
		name: "Trizhalyn L. Maglangit",
		img: "/profile/trizha.JPG",
		position: "Writer",
	},
	{
		name: "Kevin Z. Corpin",
		img: "/profile/kevin.png",
		position: "UI/UX Designer",
	},
	{
		name: "Novie Dame E. Marbas",
		img: "/profile/novs.jpg",
		position: "UI/UX Designer",
	},
	{
		name: "Jaymar M. Walohan",
		img: "/profile/jimar.jpg",
		position: "Front-end Developer",
	},
	{
		name: "Efrhaim Jay J. Riate",
		img: "/profile/ej.jpg",
		position: "Writer",
	},
	{
		name: "John Lloyd N. Igharas",
		img: "/profile/jlloyd.jpg",
		position: "Meta Developer",
	},
	{
		name: " John Philip N. Bulaclac",
		img: "/profile/jaypeee.jpg",
		position: "Multimedia Manager",
	},
	{
		name: "Mikkie Gregorio",
		img: "/profile/miki.jpg",
		position: "Front-end Developer",
	},
];

const AboutPage: NextPage = () => {
	return (
		<>
			<motion.div
				variants={AnimPageTransition}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative pt-16 pb-36 w-full min-h-screen lg:pt-24"
			>
				<div className="flex flex-col gap-8 justify-between lg:flex-row">
					<div className="flex flex-col justify-center w-full lg:w-5/12">
						<h1 className="pb-4 text-3xl font-bold leading-9 lg:text-4xl text-primary">
							About Us
						</h1>
						<p className="text-base font-normal leading-6 text-base-content">
							Come on in and discover what opportunities await you at Wicket—a
							progressive web career platform for Hunters and Provisioners (in
							Metro Manila). By establishing a platform where job providers and
							job seekers can interact with each other, Wicket aims to help the
							steady increase of the employment rate in the Philippines.
						</p>
					</div>
					<div className="relative w-full lg:w-8/12">
						<Image
							className="object-cover w-full h-full rounded-btn"
							src="/profile/groupbg.png"
							alt="A group of People"
							fill
						/>
					</div>
				</div>

				<div className="flex flex-col gap-8 justify-between pt-12 lg:flex-row">
					<div className="flex flex-col justify-center w-full lg:w-5/12">
						<h1 className="pb-4 text-3xl font-bold leading-9 lg:text-4xl text-primary">
							Our Story
						</h1>
						<p className="text-base font-normal leading-6 text-base-content">
							Wicket is developed by Wicket Journeys - a band of college
							students (from UCC) running on caffeine-injected three-hour
							sleeps, dreams of making it to the end of the semester, and hopes
							of alleviating employment issues in (Metro Manila/ the
							Philippines).
						</p>
					</div>
					<div className="w-full lg:w-8/12 lg:pt-8">
						<div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:gap-2">
							{thePeople.map((person, key: number) => (
								<div
									key={`person-${key + 1}`}
									className="flex flex-col justify-center items-center p-4 pb-6"
								>
									<Image
										className="md:block hidden object-cover object-center w-[100px] h-[100px] rounded-full"
										src={person.img}
										alt={person.name}
										width={100}
										height={100}
									/>
									<Image
										className="md:hidden block object-cover object-center w-[100px] h-[100px] rounded-full"
										src={person.img}
										alt={person.name}
										width={100}
										height={100}
									/>
									<p className="mt-4 text-xl font-medium leading-5 text-center">
										{person.name}
										<br />
										<span className="text-xs font-normal leading-none opacity-50">
											{person.position}
										</span>
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default AboutPage;
