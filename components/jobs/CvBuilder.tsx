import { FC, useState } from "react";
import { HEducation, HWorkExperience, IUserHunter } from "@/lib/types";
import { MdAdd, MdDelete } from "react-icons/md";

import { $accountDetails } from "@/lib/globalStates";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import { useStore } from "@nanostores/react";

const CvBuilder: FC = () => {
	const _currentUser = useStore($accountDetails) as IUserHunter;
	const [tempUserDetails, setTempUserDetails] =
		useState<IUserHunter>(_currentUser);
	const router = useRouter();

	const generateCV = async () => {
		toast.loading("Generating CV...");

		// update user details
		const { error } = await supabase
			.from("user_hunters")
			.update({
				cover_letter: tempUserDetails.cover_letter,
			})
			.eq("id", _currentUser.id);

		if (error) {
			toast.error("Something went wrong");
			return;
		}

		toast.dismiss();
		router.push("/h/jobs/cv");
	};

	return (
		_currentUser && (
			<>
				<div>
					<h2 className="text-3xl">Build your Wicket CV here</h2>

					<div className="mt-10">
						<h4 className="text-lg font-bold">
							Write a cover letter to the hiring manager. Then click the button
							below to generate your CV.
						</h4>

						<textarea
							name="cover_letter"
							rows={10}
							className="textarea textarea-primary w-full"
							placeholder="Write your cover letter here"
							onChange={(e) =>
								setTempUserDetails({
									...tempUserDetails,
									cover_letter: e.target.value,
								})
							}
						>
							{tempUserDetails.cover_letter}
						</textarea>
						{tempUserDetails.cover_letter.length < 200 && (
							<p className="text-sm text-red-500">
								Your cover letter must be at least 200 characters long
							</p>
						)}

						<div className="flex justify-end mt-2 gap-2">
							<button
								disabled={tempUserDetails.cover_letter.length < 200}
								className="btn btn-primary"
								onClick={() => {
									if (tempUserDetails.cover_letter.length < 200) {
										toast.error(
											"Your cover letter must be at least 200 characters long",
										);
										return;
									}
									generateCV();
								}}
							>
								Submit and Generate CV
							</button>
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default CvBuilder;