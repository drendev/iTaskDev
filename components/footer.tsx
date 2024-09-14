import Image from "next/image";
import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const Footer = () => {
  return (
    <>
      <hr className="mt-24" />
      <div className="flex lg:items-center pb-10 flex-col px-8 lg:px-0 xl:w-3/4 mx-auto 2xl:w-[55%]">
        <div className="lg:flex lg:space-x-32 md:px-0">
          <div className="pt-4">
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

            <div className="flex space-x-2">
              <PiInstagramLogoFill className="text-2xl text-gray-500" />
              <PiTwitterLogoFill className="text-2xl text-gray-500" />
              <PiFacebookLogoFill className="text-2xl text-gray-500" />
              <PiYoutubeLogoFill className="text-2xl text-gray-500" />
              <PiLinkedinLogoFill className="text-2xl text-gray-500" />
            </div>
          </div>

          <div className="flex-col space-y-6 flex">
            <div className="pt-10 font-medium">INFORMATION</div>
            <div className="font-light space-y-4 text-sm">
              <div>About the developers</div>
              <div>Documentation</div>
              <div>User Manual</div>
              <div>History</div>
              <div>Terms and Conditions</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
