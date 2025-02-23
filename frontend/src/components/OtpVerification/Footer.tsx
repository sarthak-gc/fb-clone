import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="w-full  flex flex-col items-center">
        <div className="w-[980px] border-t border-t-[#dddfe2]">
          <ul className="flex cssHere gap-5 pt-4">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
            <li>
              <a href="#">Ad choices</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
        <div className="w-[980px] pt-6 text-[#737373]">
          <span>Meta © 2025</span>
        </div>
        <div>
          <ul className="cssHere flex gap-3 text-gray-600 justify-start  w-[980px]">
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
