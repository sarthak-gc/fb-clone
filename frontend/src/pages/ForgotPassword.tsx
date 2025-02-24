import { Link } from "react-router-dom";
import Header from "../components/PasswordReset/Header";
import Footer from "../components/Registration/Footer";

const ForgotPassword = () => {
  return (
    <div className="h-screen w-screen ">
      <Header />
      <div className="h-[435px] min-h-[435px] bg-[#e9ebee] w-screen flex items-center justify-center">
        <div className="h-[275px] w-1/4 min-w-[500px]  bg-white shadow-sm rounded-[5px]">
          <div className="w-full  border-b border-b-[#e5e5e5] h-[60px] text-[20px] font-semibold flex items-center ">
            <h1 className="px-[20px]">Find your account</h1>
          </div>
          <form>
            <div className="p-[20px] pb-0">
              <h1 className="leading-[1.34]">
                Please enter your email or mobile number to search for your
                account.
              </h1>

              <input
                type="text"
                name=""
                id=""
                className="border border-[#ccd0d5] w-full h-[51px] my-[20px] rounded-[5px] px-[20px]"
                placeholder="Email or mobile number"
              />
            </div>

            <div className="border-t border-t-[#e5e5e5]  py-[12px] flex justify-end items-center  px-[20px]">
              <div className="flex gap-4">
                <Link
                  to="/"
                  className={`bg-[#ebedf0] text-[#4b4f56]  px-[20px] py-[6px] font-bold rounded-[6px] text-[15px]`}
                >
                  Cancel
                </Link>

                <button
                  className={`bg-[#1877f2] text-white  px-[20px] py-[6px] font-bold rounded-[6px] text-[15px]`}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="  mt-[150px]">
        <Footer whatColor="gray " />
      </div>
    </div>
  );
};

export default ForgotPassword;
