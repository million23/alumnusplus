import { FiBookmark } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
  return (
    <motion.div className="p-3 bg-base-200 rounded-btn flex gap-4 justify-start h-max ">
      <Image
        src={`https://avatars.dicebear.com/api/initials/${job.uploader_legal_name}.svg`}
        width={48}
        height={48}
        className="rounded-full w-12 h-12"
        alt={job.uploader_legal_name}
      />
      <div className="flex flex-col">
        <Link
          href={`jobs/${job.id}`}
          className="text-lg font-bold link hover:link-primary"
        >
          {job.job_title
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}
        </Link>
        <p className="text-sm text-base-content text-opacity-50">
          {job.uploader_legal_name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}
        </p>

        <p className="my-5">
          {
            // truncate to 50 characters
            job.job_description.length > 150
              ? job.job_description.substring(0, 150) + "..."
              : job.job_description
          }
        </p>

        <p className="font-light text-sm">
          {job.job_location
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}{" "}
          ({job.job_mode} - {job.job_type})
        </p>
      </div>
      <div className="flex flex-col ml-auto">
        <button className="btn btn-square btn-ghost">
          <FiBookmark className="text-lg" />
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
