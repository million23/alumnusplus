import { AnimLoading, AnimPageTransition } from "@/lib/animations";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";
import { FormEvent, useState } from "react";
import { IUserHunter, THunterBlogPost, TProvBlogPost } from "@/lib/types";
import { useQueries, useQuery } from "@tanstack/react-query";

import { $accountDetails } from "@/lib/globalStates";
import FeedCard from "@/components/feed/FeedCard";
import Image from "next/image";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import ProvFeedCardGrid from "@/components/feed/ProvFeedCardGrid";
import Tabs from "@/components/Tabs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import { useStore } from "@nanostores/react";
import { uuid } from "uuidv4";

type TTab = {
	title: string;
	value: "hunter" | "provisioner";
};

const FeedPage = () => {
	const [isMakingPost, setIsMakingPost] = useState(false);
	const _currentUser = useStore($accountDetails) as IUserHunter;
	const [feedList_ui] = useAutoAnimate<HTMLDivElement>();
	const [mainFeed_ui] = useAutoAnimate<HTMLDivElement>();
	const [tabContent] = useAutoAnimate<HTMLDivElement>();
	const [feedTab, selectedFeedTab] = useState<"hunter" | "provisioner">(
		"hunter",
	);
	const router = useRouter();

	const feedTabs: TTab[] = [
		{
			title: "Hunter",
			value: "hunter",
		},
		{
			title: "Provisioner",
			value: "provisioner",
		},
	];

	const fetchHunterFeed = async () => {
		const { data, error } = await supabase
			.from("public_posts")
			.select("*,uploader(*)")
			.in("uploader", [_currentUser.id, ..._currentUser.connections])
			.order("createdAt", { ascending: false })
			.eq("draft", false);

		if (error) {
			console.log("hunter feed error", error);
			return [] as THunterBlogPost[];
		}

		return data as THunterBlogPost[];
	};

	const fetchProvFeed = async () => {
		const followingList = _currentUser.followedCompanies;

		const { data, error } = await supabase
			.from("public_provposts")
			.select("*,uploader:uploader(*)")
			.order("createdAt", { ascending: false })
			.in("uploader", followingList)
			.eq("type", "provblog")
			.eq("draft", false);

		if (error) {
			console.log("error", error);
			return [] as TProvBlogPost[];
		}

		return data as TProvBlogPost[];
	};

	const fetchRecommendedUsers = async () => {
		const connections = _currentUser.connections.concat(_currentUser.id);

		const { data, error } = await supabase
			.from("new_recommended_hunters")
			.select("*")
			.limit(4);

		if (error) {
			console.log("error", error);
			return [] as IUserHunter[];
		}

		const filtered = data.filter(
			(user: { id: string }) => !connections.includes(user.id),
		);

		return filtered as IUserHunter[];
	};

	const hunterFeed = useQuery({
		queryKey: ["h.feed.hunter"],
		queryFn: fetchHunterFeed,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!_currentUser,
		networkMode: "offlineFirst",
		keepPreviousData: true,
	});
	const provFeed = useQuery({
		queryKey: ["h.feed.provisioner"],
		queryFn: fetchProvFeed,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!_currentUser,
		networkMode: "offlineFirst",
		keepPreviousData: true,
	});
	const recommendedUsers = useQuery({
		queryKey: ["h.feed.recommended"],
		queryFn: fetchRecommendedUsers,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!_currentUser,
		networkMode: "offlineFirst",
	});

	const handlePost = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const content = form.content.value;
		const isDraft = form.isDraft as HTMLInputElement;

		if (!content) {
			toast.error("Content is required");
			return;
		}

		toast.loading("Posting...");

		const { error } = await supabase.from("public_posts").insert({
			id: uuid(),
			content,
			comments: [],
			createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
			type: "blogpost",
			updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
			uploader: _currentUser.id,
			upvoters: [],
			draft: isDraft.checked ? true : false,
		});

		toast.dismiss();
		if (error) {
			toast.error("Something went wrong");
			return;
		}

		toast.success("Posted!");
		if (isDraft.checked) {
			toast("This post is a draft. You can edit it in your profile");
		}

		hunterFeed.refetch();
		setIsMakingPost(false);
	};

	return (
		<>
			<motion.main
				variants={AnimPageTransition}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-5 gap-4 pt-24 pb-36"
			>
				{_currentUser ? (
					<>
						{/* feed */}
						<div
							className="col-span-full lg:col-span-3 w-full"
							ref={mainFeed_ui}
						>
							{/* create post */}
							<div ref={mainFeed_ui} className="flex gap-2 w-full relative">
								{!isMakingPost ? (
									<>
										<Image
											src={_currentUser.avatar_url}
											alt="avatar"
											width={48}
											height={48}
											className="bg-primary object-cover rounded"
										/>

										<input
											placeholder="What's on your mind?"
											readOnly
											onClick={() => setIsMakingPost(true)}
											className="input input-primary w-full"
										/>
									</>
								) : (
									<form onSubmit={handlePost} className="w-full">
										<textarea
											placeholder="What's on your mind?"
											rows={10}
											name="content"
											className="textarea textarea-primary w-full"
										/>
										<p className="text-xs opacity-75 text-right">Markdown</p>
										<label className="mt-3 flex items-center gap-2">
											<input
												type="checkbox"
												name="isDraft"
												className="toggle toggle-primary"
											/>
											<span>Save as Draft</span>
										</label>
										<div className="flex justify-end gap-2">
											<button
												type="reset"
												onClick={() => setIsMakingPost(false)}
												className="btn btn-ghost"
											>
												Cancel
											</button>
											<button type="submit" className="btn btn-primary">
												Post
											</button>
										</div>
									</form>
								)}
							</div>

							{/* desktop tabs */}
							<Tabs
								tabs={feedTabs}
								activeTab={feedTab}
								onTabChange={(tab) => {
									selectedFeedTab(tab as "hunter" | "provisioner");
								}}
							/>
							{/* mobile select */}
							<div className="lg:hidden mt-5 w-full">
								<select
									className="select select-bordered w-full "
									value={feedTab}
									onChange={(e) => {
										selectedFeedTab(e.target.value as "hunter" | "provisioner");
									}}
								>
									{feedTabs.map((tab) => (
										<option key={tab.value} value={tab.value}>
											{tab.title}
										</option>
									))}
								</select>
							</div>

							{/* feed list */}
							<div className="mt-10 overflow-y-hidden" ref={tabContent}>
								{feedTab === "hunter" && (
									<div className="flex flex-col gap-5" ref={feedList_ui}>
										{hunterFeed.isFetching && (
											<div className="py-10 flex flex-col">
												<FiLoader className="animate-spin duration-500 text-3xl self-center" />
												<p className="text-center w-full self-center max-w-xs">
													Loading feed... This may take a while.
												</p>
											</div>
										)}

										{hunterFeed.isSuccess &&
											hunterFeed.data.map((item: THunterBlogPost) => {
												if (!item.draft) {
													return (
														<FeedCard
															blogData={item}
															key={item.id}
															refetchData={hunterFeed.refetch}
														/>
													);
												}
											})}

										{hunterFeed.isError && (
											<div className="py-10 flex flex-col">
												<FiAlertTriangle className="text-3xl self-center" />
												<p className="text-center w-full self-center max-w-xs">
													Something went wrong. Please try again later. Or click
													the button below to refresh.
												</p>
												<button
													onClick={() => hunterFeed.refetch()}
													className="btn btn-primary self-center"
												>
													Refresh
												</button>
											</div>
										)}
									</div>
								)}
								{feedTab === "provisioner" && (
									<div className="flex flex-col gap-5" ref={feedList_ui}>
										{provFeed.isLoading && (
											<div className="py-10 flex flex-col">
												<FiLoader className="animate-spin duration-500 text-3xl self-center" />
												<p className="text-center w-full self-center max-w-xs">
													Loading feed... This may take a while.
												</p>
											</div>
										)}

										{provFeed.isSuccess &&
											provFeed.data.map((item) => (
												<ProvFeedCardGrid item={item} key={item.id} />
											))}
									</div>
								)}

								<div className="divider my-5 lg:my-0 lg:mt-5">End of List</div>
							</div>
						</div>

						{/* friend suggest and footer */}
						<div className="col-span-full lg:col-span-2 flex flex-col gap-5">
							{/* search for people */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const formData = new FormData(e.currentTarget);

									const searchQuery = formData.get("searchQuery");

									if (!searchQuery) {
										toast.error("Search query is required");
										return;
									}

									router.push(`/h/search?query=${searchQuery}`);
								}}
								className="input-group"
							>
								<input
									type="text"
									name="searchQuery"
									placeholder="Search for people"
									className="input input-primary flex-1"
								/>
								<button type="submit" className="btn btn-primary">
									<MdSearch className="text-lg" />
								</button>
							</form>

							<div className="flex flex-col rounded-btn gap-3">
								<p className="text-2xl font-bold">Suggested Connections</p>

								{recommendedUsers.isLoading && (
									<div className="flex flex-col gap-2">
										{Array(5)
											.fill("")
											.map((_, index) => (
												<motion.div
													variants={AnimLoading}
													animate="animate"
													key={`recommendedloading_${index}`}
													className="h-[72px] w-full bg-slate-500/50 rounded-btn animate-pulse"
												/>
											))}
									</div>
								)}

								<div className="flex flex-col gap-2">
									{recommendedUsers.isSuccess &&
									recommendedUsers.data.length < 1 ? (
										<p>
											We can&apos;t find any recommended connections for you at
											this moment.
										</p>
									) : (
										<div className="flex flex-col gap-2">
											{recommendedUsers.isSuccess &&
												recommendedUsers.data.map((thisUser, index) => (
													<Link
														href={`/h?user=${thisUser.username}`}
														key={`connection_${index}`}
														className="flex gap-2 items-center justify-between p-2 hover:bg-base-200 rounded-btn"
													>
														<div className="flex gap-2 items-center">
															<Image
																src={thisUser.avatar_url}
																alt="avatar"
																className="w-12 h-12 mask mask-squircle bg-primary object-center object-cover"
																width={48}
																height={48}
															/>
															<div>
																<p className="font-bold leading-none">
																	{thisUser.full_name.first}{" "}
																	{thisUser.full_name.last}
																</p>
																<p className="opacity-50 leading-none">
																	@{thisUser.username}
																</p>
															</div>
														</div>
													</Link>
												))}
										</div>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="col-span-full my-10 flex flex-col items-center justify-center">
						<p className="text-2xl font-bold">You are not logged in.</p>
						<p className="text-center">
							Please login to view your feed. If you don&apos;t have an account,
							please register.
						</p>
					</div>
				)}
			</motion.main>
		</>
	);
};

export default FeedPage;
