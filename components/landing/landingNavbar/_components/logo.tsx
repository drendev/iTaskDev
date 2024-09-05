import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <div className="flex items-center gap-2  p-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-8"
          />
          <p className="font-bold text-lg">iTaskDev</p>
        </div>
      </Link>
    </>
  );
};

export default Logo;
