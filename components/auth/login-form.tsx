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
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js" />
    </head>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <div className="flex justify-center mt-14">
            <CardWrapper headerLabel="Connect & Collaborate" showSocial>
              <div className="text-center items-center w-full gap-x-2">
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
            </CardWrapper>
          </div>
        </div>
        <div className="basis-1/2 content-center relative">
          <div className="flex justify-center mt-14">
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};
