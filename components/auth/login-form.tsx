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
import test1 from "@/assets/test1.png";
import test2 from "@/assets/test2.png";
import test3 from "@/assets/test3.png";
import Logo from "@/assets/logoMain.png";
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
      <section className="bg-gray-50 min-h-screen flex items-center justify-center shadow-xl shadow-black">
        <div className="basis-1/2 bg-slate-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="px-8 md:px-16">
            <div className="text-center items-center w-full gap-x-2">
              <div className="m-auto justify-center items-center relative left-[90px] mb-3">
                <Image src={Logo} alt="Logo" height={40} width={40} />
              </div>
              <h1 className="text-2xl font-bold mb-8">
                Sign in to your Account
              </h1>
              <p className="mb-2">Connect and Collaborate</p>
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

          {/* <div className="md:block basis-1/2 w-1/2">
            <Carousel
              className="w-full max-w-xs"
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
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src={test1} alt="Saas Logo" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src={test2} alt="Saas Logo" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src={test3} alt="Saas Logo" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div> */}
        </div>
      </section>
    </>
  );
};
