import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";

type ShowPasswordProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

export function ShowPassowrd({
  showPassword,
  setShowPassword,
}: ShowPasswordProps) {
  return (
    <span
      className="absolute top-[30%] right-4 text-xl"
      onClick={() => setShowPassword((prevState) => !prevState)}>
      {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
    </span>
  );
}
