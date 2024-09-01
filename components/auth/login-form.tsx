"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/form-error";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Logo from "@/public/logo.png";

// Tempo imports
import illust1 from "@/public/illust1.png";
import illust2 from "@/public/illust2.png";
import illust3 from "@/public/illust3.png";
import illust4 from "@/public/illust4.png";
import illust5 from "@/public/illust5.png";
import bg from "@/public/bg.png"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { url } from "inspector";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : searchParams.get("error") === "OAuthCallbackError"
      ? "Authentication Cancelled"
      : "";

  const onClick = (provider: "google" | "github") => {
    if (provider == "github") {
      setLoading(true);
      setDisabled(true);
    }
    if (provider == "google") {
      setLoading1(true);
      setDisabled(true);
    }
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div>
        <header className="hidden md:block z-20">
          <div className="py-5">
            <div className="container">
              <div className="flex items-center justify-between">
                <div>
                <Image src={Logo} alt="Saas Logo" height={40} width={40}/>
                
                </div>
                <nav className="hidden md:flex gap-6 text-black/60 items-center">
                  <a href="#">Terms</a>
                  <a href="#">About</a>
                  <a href="#">Docs</a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className="flex absolute items-center justify-center min-h-screen bg-gray-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex flex-col border-r-4 border-b-4 border-black bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="mt-20">
              <div className="text-center items-center w-full gap-x-2 px-32">
                <h1 className="mt-5 mb-3 text-2xl font-extrabold text-left">
                  Plan and Code.
                </h1>
                <h1 className="mb-5 text-xl text-gray-600 text-left">
                  Sign In to iTaskDev.
                </h1>
                <FormError message={urlError} />
                <Button
                  className="w-full text-md font-semibold"
                  size="lg"
                  onClick={() => onClick("github")}
                  disabled={disabled}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {" "}
                      <FaGithub className="mr-2" /> Sign In with Github{" "}
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground my-2">or</p>
                <Button
                  className="w-full text-md font-semibold"
                  variant="outline"
                  size="lg"
                  onClick={() => onClick("google")}
                  disabled={disabled}
                >
                  {loading1 ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {" "}
                      <FcGoogle className="mr-2" /> Sign In with Google{" "}
                    </>
                  )}
                </Button>
              </div>
            </div>
            {/* Second page */}
            <div className="text-center hidden md:flex items-center flex-col justify-center m-auto pr-8">
              <Carousel
                className="w-full max-w-xs mt-20 mr-10 ml-14"
                opts={{
                  watchDrag: false,
                }}
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                  }),
                ]}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <Image
                        src={illust1}
                        height={300}
                        width={300}
                        alt="Saas Logo"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Image
                        src={illust2}
                        height={300}
                        width={300}
                        alt="Saas Logo"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Image
                        src={illust3}
                        height={300}
                        width={300}
                        alt="Saas Logo"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Image
                        src={illust4}
                        height={300}
                        width={300}
                        alt="Saas Logo"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Image
                        src={illust5}
                        height={300}
                        width={300}
                        alt="Saas Logo"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <div className="h-40 w-80 mt-5">
                <TypeAnimation
                  sequence={[
                    "User-Friendly workspace for developers",
                    1000,
                    "Find the best software development cycle for your project",
                    500,
                    "Track your progress",
                    3000,
                    "Collaborate with your team",
                    4000,
                    "Automatic task allocation feature",
                    1500,
                  ]}
                  wrapper="div"
                  speed={60}
                  repeat={Infinity}
                  className="text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
