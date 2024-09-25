import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={100}
      height={100}
      className="w-6 h-6 mr-1"
    />
  );
};

export default Logo;
