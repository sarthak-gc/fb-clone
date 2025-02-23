import { ChangeEvent, useState } from "react";
import { userRegistrationStore } from ".././store/registrationStore";

import { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/OtpVerification/Header";
import Footer from "../components/OtpVerification/Footer";
import Input from "../components/OtpVerification/Input";
import Information from "../components/OtpVerification/Information";
const VerifyOtp = () => {
  const email = userRegistrationStore().email;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log(email);
  console.log(inputRef);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      setOtp(e.target.value);
    } else {
      if ((e.nativeEvent as InputEvent).inputType === "deleteContentBackward") {
        setOtp(e.target.value);
      }
    }
  };

  return (
    <div className="h-screen bg-[#e9ebee]  overflow-scroll ">
      <Header />
      <div className="min-h-[640px]  flex justify-center ">
        <div className="w-[510px]  h-fit bg-white rounded-[8px] mt-10">
          <h2 className="leading-[24px] text-xl font-bold px-[18px] py-[20px] border-b w-full border-b-[#e9ebee] ">
            Enter the code from your email
          </h2>
          <div className="  flex flex-col  shadow-md">
            <Information email={email} />
            <form action="" className="w-full flex flex-col ">
              <div className=" px-[14px] w-full h-[58px] ">
                <div
                  className={`w-1/3 h-full flex  items-center px-2 border-[1px] rounded-[4px] border-[#ccd0d5] ${
                    isFocused
                      ? "border-blue-500 shadow-[inset_0_2px_6px_rgba(0,0,100,0.1)]"
                      : ""
                  }`}
                  onClick={() => {
                    inputRef.current?.focus();
                  }}
                >
                  <span className="text-[#8f96a0] mr-1">FB- </span>
                  <Input
                    handleChange={handleChange}
                    ref={inputRef}
                    type="text"
                    setIsFocused={setIsFocused}
                    value={otp}
                  />
                </div>
              </div>
              <span className=" px-[14px] w-fit text-[#1877f2] hover:underline mt-[10px] mb-[20px]">
                Send email again
              </span>
              <div className="border-t border-t-[#e9ebee] w-full px-[11px] py-[14px] flex justify-end gap-4">
                {" "}
                <Link
                  to="/"
                  className={`bg-[#ebedf0] text-[#1c1e21]  px-[11px] py-[4px] font-bold rounded-[6px]`}
                >
                  Update contact info
                </Link>
                <button
                  disabled={otp.length > 0}
                  className={`${
                    otp.length === 0
                      ? "bg-[#ebedf0] text-[#bec3c9] "
                      : "bg-[#1877f2] text-white"
                  } px-[40px] py-[4px] font-bold rounded-[6px]`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyOtp;
