import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";

import Link from "next/link";
import { SiDiscord } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <div className="h-[2px] w-96 bg-primary my-5 mx-auto rounded-lg" />
      <footer className="footer p-10 text-base-content">
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 103 111"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M99.6585 81.2195C99.6585 85.3171 98.878 89.1951 97.3171 92.8537C95.7561 96.4634 93.6098 99.6098 90.8781 102.293C88.1951 104.976 85.0244 107.098 81.3659 108.659C77.7561 110.22 73.878 111 69.7317 111C66.0244 111 62.4634 110.366 59.0488 109.098C55.6341 107.78 52.5366 105.878 49.7561 103.39C47.0244 105.878 43.9512 107.78 40.5366 109.098C37.1707 110.366 33.6098 111 29.8537 111C25.7073 111 21.8293 110.22 18.2195 108.659C14.6098 107.098 11.439 104.976 8.70732 102.293C6.02439 99.6098 3.90244 96.4634 2.34146 92.8537C0.780488 89.1951 0 85.3171 0 81.2195V31.3171H19.9756V81.2195C19.9756 82.5854 20.2195 83.8781 20.7073 85.0976C21.2439 86.2683 21.9512 87.3171 22.8293 88.2439C23.7561 89.122 24.8049 89.8293 25.9756 90.3659C27.1951 90.8537 28.4878 91.0976 29.8537 91.0976C31.2195 91.0976 32.5122 90.8537 33.7317 90.3659C34.9512 89.8293 36.0244 89.122 36.9512 88.2439C37.878 87.3171 38.5854 86.2683 39.0732 85.0976C39.6098 83.8781 39.878 82.5854 39.878 81.2195V31.3171H59.7805V81.2195C59.7805 82.5854 60.0488 83.8781 60.5854 85.0976C61.122 86.2683 61.8293 87.3171 62.7073 88.2439C63.6341 89.122 64.6829 89.8293 65.8537 90.3659C67.0732 90.8537 68.3659 91.0976 69.7317 91.0976C71.0976 91.0976 72.3902 90.8537 73.6098 90.3659C74.8293 89.8293 75.878 89.122 76.7561 88.2439C77.6829 87.3171 78.4146 86.2683 78.9512 85.0976C79.4878 83.8781 79.7561 82.5854 79.7561 81.2195V47.3015H99.6585V81.2195Z"
              fill="#0077b8"
            />
            <path
              d="M102.805 13.3171C102.805 15.1707 102.439 16.9024 101.707 18.5122C101.024 20.122 100.073 21.5366 98.8537 22.7561C97.6341 23.9268 96.1951 24.878 94.5366 25.6098C92.9268 26.2927 91.1951 26.6341 89.3415 26.6341C87.4878 26.6341 85.7317 26.2927 84.0732 25.6098C82.4634 24.878 81.0488 23.9268 79.8293 22.7561C78.6585 21.5366 77.7073 20.122 76.9756 18.5122C76.2927 16.9024 75.9512 15.1707 75.9512 13.3171C75.9512 11.5122 76.2927 9.80488 76.9756 8.19512C77.7073 6.53659 78.6585 5.12195 79.8293 3.95122C81.0488 2.73171 82.4634 1.78049 84.0732 1.09756C85.7317 0.365854 87.4878 0 89.3415 0C91.1951 0 92.9268 0.365854 94.5366 1.09756C96.1951 1.78049 97.6341 2.73171 98.8537 3.95122C100.073 5.12195 101.024 6.53659 101.707 8.19512C102.439 9.80488 102.805 11.5122 102.805 13.3171Z"
              fill="#0077b8"
            />
          </svg>
          <p className="font-bold">Wicket Journeys</p>
        </div>
        <div>
          <span className="footer-title">Features</span>
          <Link href="/util/features#blogging" className="link link-hover">
            Mini Blogging
          </Link>
          <Link
            href="/util/features#companyhunting"
            className="link link-hover"
          >
            Geo-Company Hunting
          </Link>
          <Link href="/util/features#jobposting" className="link link-hover">
            Job Posting
          </Link>
          <Link href="/util/features#metaverse" className="link link-hover">
            Metaverse
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <p className="link link-hover">About</p>
          <p className="link link-hover">Contact</p>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <p className="link link-hover">Terms of use</p>
          <p className="link link-hover">Privacy policy</p>
          <p className="link link-hover">Cookie policy</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
