import React from "react";

interface BirthdaySelectionI {
  birthday: { month: string; day: string; year: string };
  handleDateChange: (type: string, value: string) => void;
  generateOptions: (start: number, end: number) => React.JSX.Element[];
  generateYearOptions: () => React.JSX.Element[];
}

const BirthdaySelection: React.FC<BirthdaySelectionI> = ({
  birthday,
  handleDateChange,
  generateOptions,
  generateYearOptions,
}) => {
  return (
    <div className="w-full flex flex-col justify-between ">
      <h1 className="text-[#606770] flex gap-1 items-center mb-2">
        <span>Birthday</span>

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

      <div className="flex gap-2">
        <select
          className="border h-[36px] border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
          name="month"
          id="month"
          value={birthday.month}
          onChange={(e) => handleDateChange("month", e.target.value)}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option
              className="border border-black bg-red-400"
              key={index}
              value={(index + 1).toString().padStart(2, "0")}
            >
              {month}
            </option>
          ))}
        </select>

        <select
          className="border  h-[36px] border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
          name="day"
          id="day"
          value={birthday.day}
          onChange={(e) => handleDateChange("day", e.target.value)}
        >
          {generateOptions(1, 31)}
        </select>

        <select
          className="border  h-[36px] border-[#ccd0d5] rounded-[4px] w-full  flex justify-between items-center px-[8px]"
          name="year"
          id="year"
          value={birthday.year}
          onChange={(e) => handleDateChange("year", e.target.value)}
        >
          {generateYearOptions()}
        </select>
      </div>
    </div>
  );
};

export default BirthdaySelection;
