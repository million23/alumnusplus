import { $themeMode } from "@/lib/globalStates";
import { AnimPageTransition } from "@/lib/animations";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "@nanostores/react";

const ProvProfilePage: NextPage = () => {
	const _currentTheme = useStore($themeMode);
	const router = useRouter();

	const getTheme = () => {
		if (typeof window !== "undefined" && window.localStorage) {
			const storedPrefs = window.localStorage.getItem("theme");
			if (typeof storedPrefs === "string") {
				return storedPrefs;
			}

			const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
			if (userMedia.matches) {
				return "dark";
			}
		}

		return "light";
	};

	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const localTheme = getTheme();
		if (localTheme) {
			$themeMode.set(localTheme as "light" | "dark");
			document.body.setAttribute("data-theme", localTheme);
		}
	}, []);

	return (
		<>
			<motion.main
				variants={AnimPageTransition}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative min-h-screen w-full flex flex-col gap-10 pt-24 pb-36 "
			>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
					<div className="col-span-full lg:col-span-3">
						{/* profile */}
						<div className="relative rounded-btn overflow-hidden flex flex-col gap-3">
							<div className="absolute h-[200px] w-full">
								<div className="bg-gradient-to-t from-base-100 to-transparent w-full h-full absolute opacity-75" />
								<Image
									className="object-cover rounded-btn rounded-b-none object-center w-full h-full "
									src="https://picsum.photos/900/450"
									alt="background"
									width={900}
									height={450}
									priority
								/>
							</div>
							<div className="z-10 mt-[150px] px-5 flex items-end gap-5">
								<Image
									className="mask mask-squircle"
									src="https://picsum.photos/100"
									alt="profile"
									width={100}
									height={100}
									priority
								/>
								<div>
									<p className="text-xl leading-tight font-bold">
										Wicket Journeys
									</p>
									<p className="text-sm">69 followers</p>
								</div>
							</div>
							<div className="z-10 flex justify-end items-center gap-2 mt-5">
								<div className="btn btn-primary">Edit</div>
								<div className="btn btn-primary">Share Page</div>
								<div className="btn">View as Hunter</div>
							</div>
						</div>
						<div className="divider bg-base-content h-[5px] rounded-full opacity-20 mt-10" />
						{/* content */}
						<div className="flex justify-center items-center flex-col py-16">
							<Image
								alt=""
								priority
								src="/file-search.png"
								width={200}
								height={200}
							/>
							<div className="text-center flex flex-col items-center">
								<p className="font-bold text-xl">
									You haven&apos;t posted anything
								</p>
								<p className="leading-tight">Post your first adventure</p>
								<div className="btn btn-primary mt-5">
									Create your first post
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-full lg:col-span-2 flex flex-col gap-3">
						<div className="flex flex-col gap-3">
							<p className="text-2xl font-bold">Analytics</p>
							<div>
								<div>
									<p className="text-lg font-bold">0</p>
									<p>Search Appearances</p>
									<p className="text-sm opacity-75 leading-none">Last 7 Days</p>
									<div className="divider bg-base-content h-[1px] rounded-full opacity-40 mt-3" />
								</div>
								<div>
									<p className="text-lg font-bold">0</p>
									<p>Total Visits</p>
									<div className="divider bg-base-content h-[1px] rounded-full opacity-40 mt-3" />
								</div>
								<div>
									<p className="text-lg font-bold">0</p>
									<p>New Followers</p>
									<div className="divider bg-base-content h-[1px] rounded-full opacity-40 mt-3" />
								</div>
								<div>
									<p className="text-lg font-bold">0</p>
									<p>Custom Buttons Clicks</p>
									<div className="divider bg-base-content h-[1px] rounded-full opacity-40 mt-3" />
								</div>
							</div>
						</div>
						<div className="bg-base-200 p-4 rounded-btn flex flex-col gap-4">
							<label className="flex items-center justify-between">
								<span>Dark Mode</span>
								<input
									checked={_currentTheme === "dark"}
									onChange={(e) => {
										$themeMode.set(e.target.checked ? "dark" : "light");
										document.body.setAttribute(
											"data-theme",
											e.target.checked ? "dark" : "light",
										);
									}}
									type="checkbox"
									className="toggle toggle-primary"
								/>
							</label>
							<label className="flex items-center justify-between">
								<span>Notifications</span>
								<input
									type="checkbox"
									disabled
									className="toggle toggle-primary"
								/>
							</label>

							<label className="mt-7">
								<span>End your session</span>
								<label
									htmlFor="signOutModal"
									className="btn btn-error btn-block"
								>
									Sign Out
								</label>
							</label>
						</div>
					</div>
				</div>
			</motion.main>

			<>
				<input type='checkbox' id="signOutModal" className="modal-toggle" />
				<label htmlFor="signOutModal" className="modal">
					<label htmlFor="" className="modal-box relative">
						<label
							htmlFor="signOutModal"
							className="btn btn-sm absolute right-4 top-4"
						>
							<MdClose />
						</label>
						<h3 className="text-lg font-bold">Confirm sign out session</h3>
						<p className="py-4">Are you sure you want to end your session?</p>

						<div className="flex justify-end gap-3 mt-10">
							<label htmlFor="signOutModal" className="btn btn-error">
								No, cancel
							</label>
							<button onClick={handleSignOut} className="btn btn-primary">
								Yes, sign out
							</button>
						</div>
					</label>
				</label>
			</>
		</>
	);
};

export default ProvProfilePage;