import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";
import { RingLoader } from "react-spinners";

const NewVerificationPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <RingLoader size={50} />
                </div>
            }
        >
            <NewVerificationForm />
        </Suspense>
    );
};

export default NewVerificationPage;
