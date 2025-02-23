import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen  flex justify-center ">
      <div className="  w-[990px] pt-4 flex flex-col ">
        <ul className="cssHere flex  gap-2 text-gray-600  mt-4  ">
          <li className="eng">
            <Link to="/">English (US)</Link>
          </li>
          <li>
            <Link to="/">नेपाली</Link>
          </li>
          <li>
            <Link to="/">हिन्दी</Link>
          </li>
          <li>
            <Link to="/">Español</Link>
          </li>
          <li>
            <Link to="/">Português (Brasil)</Link>
          </li>
          <li>
            <Link to="/">日本語</Link>
          </li>
          <li>
            <Link to="/">Français (France)</Link>
          </li>
          <li>
            <Link to="/">Deutsch</Link>
          </li>
          <li>
            <Link to="/">Italiano</Link>
          </li>
          <li>
            <Link to="/">العربية</Link>
          </li>
          <li>
            <Link to="/">中文(简体)</Link>
          </li>
          <li>
            <Link
              className="bg-[#ebedf0] border border-[#ccd0d5] px-[10px]"
              to="/"
            >
              +
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col  flex-wrap   text-sm text-gray-600 pt-4 mt-2 border-t border-t-[#dddfe2]">
          <div className=" cssHere flex justify-between ">
            <li>
              <Link to="/">Sign Up</Link>
            </li>
            <li>
              <Link to="/">Log In</Link>
            </li>
            <li>
              <Link to="/">Messenger</Link>
            </li>
            <li>
              <Link to="/">Facebook Lite</Link>
            </li>
            <li>
              <Link to="/">Video</Link>
            </li>
            <li>
              <Link to="/">Places</Link>
            </li>
            <li>
              <Link to="/">Games</Link>
            </li>
            <li>
              <Link to="/">Marketplace</Link>
            </li>
            <li>
              <Link to="/">Meta Pay</Link>
            </li>
            <li>
              <Link to="/">Meta Store</Link>
            </li>
            <li>
              <Link to="/">Meta Quest</Link>
            </li>
          </div>
          <div className="cssHere flex gap-5 ">
            <li>
              <Link to="/">Ray-Ban Meta</Link>
            </li>
            <li>
              <Link to="/">Meta AI</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="/">Threads</Link>
            </li>
            <li>
              <Link to="/">Fundraisers</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/">Voting Information Center</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
          </div>
          <div className="cssHere flex   justify-between">
            <li>
              <Link to="/">Privacy Center</Link>
            </li>
            <li>
              <Link to="/">Groups</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Create ad</Link>
            </li>
            <li>
              <Link to="/">Create Page</Link>
            </li>
            <li>
              <Link to="/">Developers</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">Cookies</Link>
            </li>

            <li>
              <Link to="/">Ad choices</Link>
            </li>
            <li>
              <Link to="/">Terms</Link>
            </li>

            <li>
              <Link to="/">Help</Link>
            </li>
          </div>
          <div className="cssHere flex gap-2 ">
            <li>
              <Link to="/">Contact Uploading & Non-Users</Link>
            </li>
          </div>
        </ul>

        <div className="mt-6 text-start text-gray-500 text-sm">
          <span>Meta © 2025</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
