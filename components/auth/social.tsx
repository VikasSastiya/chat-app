"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useState } from "react";
import { Loader } from "lucide-react";

export const Social = () => {
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingGithub, setIsLoadingGithub] = useState(false);
    const onClick = (provider: "google" | "github") => {
        if (provider === "google") {
            setIsLoadingGoogle(true);
        } else {
            setIsLoadingGithub(true);
        }
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                disabled={isLoadingGoogle}
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
                {isLoadingGoogle && (
                    <Loader className="w-4 h-4 ml-2 animate-spin" />
                )}
            </Button>
            <Button
                disabled={isLoadingGithub}
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
                {isLoadingGithub && (
                    <Loader className="w-4 h-4 ml-2 animate-spin" />
                )}
            </Button>
        </div>
    );
};
