import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/public/Logo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Organize and monitor your software development project
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get Started</p>
        </div>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Help</a>
              <button className="btn">Get Started</button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
