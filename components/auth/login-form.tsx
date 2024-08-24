"use client";

import { signIn } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/route";

export const LoginForm = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return(
        <CardWrapper
        headerLabel="Login to iTaskDev"
        showSocial
        >
            <div className="text-center items-center w-full gap-x-2">
                <Button
                className="w-full text-md font-semibold"
                size="lg"
                onClick={() => onClick("github")}
                >
                    <FaGithub className="mr-2"/> Sign In with Github
                </Button>
                <p className="text-sm text-muted-foreground">
                    or
                </p>
                <Button
                    className="w-full text-md font-semibold"
                    variant="outline"
                    size="lg"
                    onClick={() => onClick("google")}
                >
                    <FcGoogle className="mr-2"/> Sign In with Google
                </Button>
            </div>
        </CardWrapper>
    )
}
