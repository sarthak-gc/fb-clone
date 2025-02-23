import { ChangeEvent } from "react";

interface InputFieldI {
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  value: string;
}

const InputField: React.FC<InputFieldI> = ({
  placeholder,
  handleChange,
  type,
  name,
  id,
  value,
}) => {
  return (
    <input

      className={`border border-[#ccd0d5]  rounded-[5px] h-[43.25px] text-[16px] px-[11px] ${
        type != "text" ? "w-full" : "w-[193.833px]"
      }`}
      placeholder={placeholder}
      onChange={(e) => {
        handleChange(e);
      }}
      type={type}
      name={name}
      id={id}
      value={value}
    />
  );
};

export default InputField;
