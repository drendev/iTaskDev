import Image from "next/image";
import Logo from "@/public/logo.png"

export const Header = () => {
  return (
    <header className="sticky backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">Terms</a>
              <a href="#">About</a>
              <a href="#">Docs</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
