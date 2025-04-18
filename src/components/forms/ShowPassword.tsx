import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

type ShowPasswordProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

export const ShowPassword: React.FC<ShowPasswordProps> = (
  showPassword,
  setShowPassword,
) => {
  return (
    <span
      data-cy="show-password-button"
      className="absolute top-[30%] right-4 text-xl cursor-pointer"
      onClick={() => setShowPassword((prevState: boolean) => !prevState)}
    >
      {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
    </span>
  );
};
