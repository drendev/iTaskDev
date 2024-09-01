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


import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-poppins">
      <div className="relative flex flex-col bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      <div className="mt-16 mb-16">
            <div className="text-center items-center w-full gap-x-2 px-32">
              <h1 className="mb-3 text-4xl font-extrabold text-left">Plan and Code.</h1>
              <h1 className="mb-10 text-4xl text-gray-600 text-left">Sign In to iTaskDev.</h1>
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
          <div className="relative text-center">
          <Carousel
          className="w-full max-w-xs mt-16 mr-10"
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
                  <Image src="/illust1.png" height={100} width={100} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                  <Image src={"/illust2.png"} height={100} width={100} alt={"Saas Logo"} />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                  <Image src="/illust3.png" height={100} width={100} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                  <Image src="/illust4.png" height={100} width={100} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                  <Image src="/illust5.png" height={100} width={100} alt="Saas Logo" />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <div className="h-40 w-80 m-auto">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "User-Friendly workspace for developers",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Find the best software development cycle for your project",
                500,
                "Track your progress",
                3000,
                "Collaborate with your team",
                4000,
                "Automatic task allocation feature",
                1500
              ]}
              wrapper="div"
              speed={60}
              repeat={Infinity}
              className="text-2xl"
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

