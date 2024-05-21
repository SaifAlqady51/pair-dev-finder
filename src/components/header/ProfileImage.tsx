import Image from "next/image";
type ProfileImageProps = {
  image: string | undefined;
  name: string;
};
export default function ProfileImage({ image, name }: ProfileImageProps) {
  if (image) {
    return (
      <Image src={image!} alt="Avatar" className="w-10 h-10 rounded-full" />
    );
  } else {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center">
        <span className="text-black text-2xl font-semibold">{name[0]}</span>
      </div>
    );
  }
}
