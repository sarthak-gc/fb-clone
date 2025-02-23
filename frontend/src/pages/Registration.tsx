import { ChangeEvent, useState, useEffect, JSX } from "react";
import { userRegistrationStore } from ".././store/registrationStore";
import { Link } from "react-router-dom";
import { handleRegistration } from ".././utils/api";

import { Gender, RegistrationDataI } from ".././types";
import Footer from "../components/Registration/Footer";
import Header from "../components/Registration/Header";
import Heading from "../components/Registration/Heading";
import InputField from "../components/Registration/InputField";
import BirthdaySelection from "../components/Registration/BirthdaySelection";
import GenderSelection from "../components/Registration/GenderSelection";
import Information from "../components/Registration/TermsAndConditions";

const RegistrationPage = () => {
  const registrationData = userRegistrationStore((state) => state);
  const setRegistrationData = userRegistrationStore(
    (state) => state.setRegistrationData
  );

  const [birthday, setBirthday] = useState({
    month: "",
    day: "",
    year: "",
  });

  useEffect(() => {
    const { month, day, year } = birthday;
    if (month && day && year) {
      const newBirthday = new Date(`${year}-${month}-${day}`);
      setRegistrationData("birthday", newBirthday);
    }
  }, [birthday, setRegistrationData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "birth-date") {
      setRegistrationData("birthday", new Date(value));
    } else {
      setRegistrationData(id as keyof RegistrationDataI, value);
    }
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedGender = e.target.value as Gender;

    if (selectedGender in Gender) setRegistrationData("gender", selectedGender);
  };

  const handleDateChange = (type: string, value: string) => {
    setBirthday((prevBirthday) => {
      const updatedBirthday = { ...prevBirthday, [type]: value };
      return updatedBirthday;
    });
  };

  const generateOptions = (start: number, end: number): JSX.Element[] => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i.toString().padStart(2, "0")}>
          {i}
        </option>
      );
    }
    return options;
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let i = 1905; i <= currentYear; i++) {
      options.unshift(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !registrationData.firstName ||
      !registrationData.lastName ||
      !registrationData.email ||
      !registrationData.password ||
      !registrationData.birthday ||
      !registrationData.gender
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    console.log(registrationData);
    try {
      await handleRegistration(registrationData as RegistrationDataI);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("There was an error registering your account.");
    }
  };
  return (
    <div className="h-screen  overflow-hidden">
      <div className="flex flex-col justify-center items-center w-full  bg-[#f0f2f5]">
        <Header />
        <div className="h-[674.967px] w-full  flex  pt-[5px] justify-center mx-auto mb-[30px] ">
          <div className="bg-white w-[432px] h-[648px]  ml-[1px]  rounded-[8px] box-border shadow-2xl ">
            <div className=" h-full w-[400px] pr-[20px] ">
              <Heading />
              <div className="w-[432px]  p-[16px] ">
                <form
                  onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
                    handleFormSubmit(e);
                  }}
                >
                  <div className="w-full  flex justify-between mb-2">
                    <InputField
                      placeholder={"First Name"}
                      handleChange={handleChange}
                      type={"text"}
                      name={"firstName"}
                      id={"firstName"}
                      value={registrationData.firstName}
                    />

                    <InputField
                      placeholder={"Last Name"}
                      handleChange={handleChange}
                      type={"text"}
                      name={"lastName"}
                      id={"lastName"}
                      value={registrationData.lastName}
                    />
                  </div>

                  <BirthdaySelection
                    birthday={birthday}
                    handleDateChange={handleDateChange}
                    generateOptions={generateOptions}
                    generateYearOptions={generateYearOptions}
                  />

                  <GenderSelection handleGenderChange={handleGenderChange} />

                  <div className=" flex flex-col mt-2 gap-2">
                    <InputField
                      placeholder="Mobile number or email"
                      type="email"
                      name="email"
                      id="email"
                      value={registrationData.email}
                      handleChange={handleChange}
                    />

                    <InputField
                      placeholder="New Password"
                      type="password"
                      name="password"
                      id="password"
                      value={registrationData.password}
                      handleChange={handleChange}
                    />
                  </div>

                  <Information />
                  <div className="w-full flex justify-center py-[8px] ">
                    <input
                      className="w-[194px] bg-[#00a400]  text-white font-bold px-[32px] rounded-[6px] h-[36px] text-[18px]"
                      type="submit"
                      name="submit"
                      id="submit"
                      value={"Sign Up"}
                    />
                  </div>
                  <div className="w-full  flex justify-center py-[8px]">
                    <Link to="/" className="text-[#1877f2] cursor-pointer">
                      Already have an account ?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
