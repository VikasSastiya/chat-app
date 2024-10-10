"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BarLoader, BeatLoader, ClockLoader, PacmanLoader, PropagateLoader, RingLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams?.get("token");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if(success || error)
            return;
        if(!token) {
            setError("Missing Token!");
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!")
            })
        console.log(token);
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="confirming your email verification"
            backButtonHref="/auth/login"
            backButtonLabel="back to login"
        >
            <div className="flex items-center justify-center w-full">
                {/* <BeatLoader /> */}
                {/* <ClockLoader /> */}
                {/* <BarLoader /> */}
                {/* <PropagateLoader /> */}
                {/* <PacmanLoader /> */}
                {!success && !error && (
                    <RingLoader size={50}/>
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    );
} 