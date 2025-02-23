import React, { ChangeEvent } from "react";

interface InputI {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement | null>;
  type: string;
  setIsFocused: (value: boolean) => void;
  value: string;
}
const Input: React.FC<InputI> = ({
  handleChange,
  ref,
  type,
  setIsFocused,
  value,
}) => {
  return (
    <input
      onChange={handleChange}
      ref={ref}
      type={type}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="w-1/2 outline-none"
      value={value}
    />
  );
};

export default Input;
