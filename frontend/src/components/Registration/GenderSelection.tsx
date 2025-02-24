import React, { ChangeEvent } from "react";
interface GenderSelectionI {
  handleGenderChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const GenderSelection: React.FC<GenderSelectionI> = ({
  handleGenderChange,
}) => {
  return (
    <div
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleGenderChange(e);
      }}
    >
      <h1 className="text-[#606770] flex gap-1 items-center mt-2 mb-1">
        <span>Gender</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="15"
          height="15"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z" />
        </svg>
      </h1>
      <div className=" flex gap-2  w-full rounded-[4px] h-[36px] ">
        <label
          htmlFor="male"
          className="border border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
        >
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="male" value={"Male"} />
        </label>
        <label
          htmlFor="female"
          className="border  border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
        >
          <label htmlFor="female">Female</label>
          <input type="radio" name="gender" id="female" value={"Female"} />
        </label>

        <label
          htmlFor="other"
          className="border  border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
        >
          <label htmlFor="other">Other</label>

          <input type="radio" name="gender" id="other" value={"Other"} />
        </label>
      </div>
    </div>
  );
};

export default GenderSelection;
