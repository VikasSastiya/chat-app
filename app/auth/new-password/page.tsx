import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";
import { RingLoader } from "react-spinners";

const NewPasswordPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <RingLoader size={50} />
                </div>
            }
        >
            <NewPasswordForm />
        </Suspense>
    );
};

export default NewPasswordPage;
