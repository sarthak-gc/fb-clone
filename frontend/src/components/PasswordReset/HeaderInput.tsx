interface HeaderInputI {
  type: string;
  name: string;
  id: string;
  placeholder: string;
}
const HeaderInput: React.FC<HeaderInputI> = ({
  type,
  name,
  id,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className=" w-[190px] h-[42px] px-[14px] border border-[#ccd0d5] rounded-[5px] placeholder:text-[#727477]"
    />
  );
};

export default HeaderInput;
