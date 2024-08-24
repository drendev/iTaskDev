"use client";

import { signIn } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useSearchParams } from "next/navigation"
import { FormError } from "@/components/form-error";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import {Suspense} from "react";

export const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loading1, setLoading1] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";

    const onClick = (provider: "google" | "github") => {
        if (provider == "github") {
            setLoading(true);
            setDisabled(true)
        }
        if (provider == "google") {
            setLoading1(true);
            setDisabled(true)
        }
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return(
        <Suspense>
            <CardWrapper
            headerLabel="Login to iTaskDev"
            showSocial
            >
                <div className="text-center items-center w-full gap-x-2">
                    <FormError message={urlError } />
                    <Button
                    className="w-full text-md font-semibold"
                    size="lg"
                    onClick={() => onClick("github")}
                    disabled={disabled}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :  <> <FaGithub className="mr-2"/> Sign In with Github </>}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        or
                    </p>
                    <Button
                        className="w-full text-md font-semibold"
                        variant="outline"
                        size="lg"
                        onClick={() => onClick("google")}
                        disabled={disabled}
                    >
                        {loading1 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :  <> <FcGoogle className="mr-2"/> Sign In with Google </>}

                    </Button>
                </div>
            </CardWrapper>
        </Suspense>
    )
}
