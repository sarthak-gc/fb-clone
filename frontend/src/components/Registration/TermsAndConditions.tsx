import { Link } from "react-router-dom";

const Information = () => {
  return (
    <div className="flex flex-col my-5 text-[#777] gap-3">
      <span className="leading-[1.34]">
        People who use our service may have uploaded your contact information to
        Facebook.
        <Link className="text-[#385898] cursor-pointer" to="/">
          {" "}
          Learn more
        </Link>
        .
      </span>

      <span className="leading-[1.34]">
        By clicking Sign Up, you agree to our{" "}
        <Link className="text-[#385898] cursor-pointer" to="/">
          Terms
        </Link>
        ,
        <Link className="text-[#385898] cursor-pointer" to="/">
          {" "}
          Privacy Policy{" "}
        </Link>
        and
        <Link className="text-[#385898] cursor-pointer" to="/">
          {" "}
          Cookies Policy{" "}
        </Link>
        .You may receive SMS Notifications from us and can opt out any time.
      </span>
    </div>
  );
};

export default Information;
