import React from "react";

const Information: React.FC<{ email: string }> = ({ email }) => {
  return (
    <span className=" px-[14px] pt-[16px] mb-[20px] text-sm leading-[19px] whitespace-normal">
      Let us know this email belongs to you. Enter the code in the email sent to{" "}
      <span className="font-bold text-[#606770]">{email} . </span>
    </span>
  );
};

export default Information;
