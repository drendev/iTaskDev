"use client";

import { signIn } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/form-error";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import illust1 from "@/assets/illust1.png";
import illust2 from "@/assets/illust2.png";
import illust3 from "@/assets/illust3.png";
import illust4 from "@/assets/illust4.png";
import illust5 from "@/assets/illust5.png";
import Logo from "@/public/logo.png";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Side */}
          <div className="mt-20">
            <div className="text-center items-center w-full gap-x-2 px-32 py-10">
              <Image src={Logo} alt="Logo" width={40} height={40} className="relative ml-[90px] bottom-10"/>
              <h1 className="mb-3 text-4xl font-bold">Sign In</h1>
              <p className="font-light text-gray-600 mb-8">
                Please enter your details
              </p>
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
          <div className="relative">
            <Carousel
              className="w-full max-w-xs m-20"
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                        <Image src={illust1} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                        <Image src={illust2} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                        <Image src={illust3} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                        <Image src={illust4} alt="Saas Logo" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                        <Image src={illust5} alt="Saas Logo" />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};
