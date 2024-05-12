import Telephon from "../../public/telephone.jpg";
import Image from "next/image";

type SigningFormWrapperProps = {
  form: React.ReactNode;
  title: string;
  children: React.ReactNode;
};
export default function SigningFormWrapper({
  form,
  title,
  children,
}: SigningFormWrapperProps) {
  return (
    <div className="flex  justify-between items-center w-screen h-screen ">
      <div className="flex px-8 sm:px-0  justify-center items-center h-full lg:w-5/12 w-full ">
        <div className="register-card p-10 lg:px-[10%] sm:px-[20%] px-0 w-full space-y-12 mb-16">
          <h1 className="font-semibold text-3xl  ">{title}</h1>
          {form}
          {children}
        </div>
      </div>

      <Image
        src={Telephon}
        alt="login image"
        className="lg:w-7/12 w-0 h-full object-cover"
      />
    </div>
  );
}
