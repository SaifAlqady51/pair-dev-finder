import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

type ShowPasswordProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

export function ShowPassword({
  showPassword,
  setShowPassword,
}: ShowPasswordProps) {
  return (
    <span
      className="absolute top-[30%] right-4 text-xl cursor-pointer"
      onClick={() => setShowPassword((prevState) => !prevState)}
    >
      {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
    </span>
  );
}
