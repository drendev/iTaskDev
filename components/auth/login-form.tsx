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
      <div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* Left Side */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <Image src={"/Logo.png"} alt="Saas Logo" height={40} width={40} />
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
              <p className="text-sm text-muted-foreground my-2 text-center">
                or
              </p>
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
              <p className="text-xs mt-2 text-justify">
                By signing In, you agree to the{" "}
                <a className="border-b border-gray-500" href="#">
                  Terms of Service and Privacy Policy
                </a>
                , including Cookie Use.
              </p>
            </div>

            {/* Right Side */}
            <div className="relative hidden md:flex w-96">
              <div className="m-auto">
                <Carousel
                  className="w-full max-w-xs"
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
                          src={"/illust1.png"}
                          height={400}
                          width={400}
                          alt="Saas Logo"
                        />
                        <p className="text-sm mt-5 font-bold italic text-center">
                          User-Friendly workspace for developers
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Image
                          src={"/illust2.png"}
                          height={300}
                          width={300}
                          alt="Saas Logo"
                        />
                        <p className="text-sm mt-5 font-bold italic text-center">
                          SDLC Recommendation for your project
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Image
                          src={"/illust3.png"}
                          height={300}
                          width={300}
                          alt="Saas Logo"
                        />
                        <p className="text-sm mt-5 font-bold italic text-center">
                          Track your progress
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Image
                          src={"/illust4.png"}
                          height={300}
                          width={300}
                          alt="Saas Logo"
                        />
                        <p className="text-sm mt-5 font-bold italic text-center">
                          Collaborate with your team
                        </p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Image
                          src={"/illust5.png"}
                          height={300}
                          width={300}
                          alt="Saas Logo"
                        />
                        <p className="text-sm mt-5 font-bold italic text-center">
                          Automatic task allocation feature
                        </p>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="flex gap-3 md:gap-10 text-center absolute bottom-[-50px] md:bottom-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xs">
            <a href="#">About</a> <a href="#">Help</a> <a href="#">Center</a>{" "}
            <a href="#">Terms</a> <a href="#">Privacy</a>{" "}
            <a href="#">Policy</a> <a href="#">Docs</a>
          </div>
        </div>
      </div>
    </>
  );
};
