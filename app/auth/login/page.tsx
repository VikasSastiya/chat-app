import { LoginForm } from "@/components/auth/login-form"
import { Suspense } from "react";
import { RingLoader } from "react-spinners";

const LoginPage = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><RingLoader size={50} /></div>}>
            <LoginForm />
        </Suspense>
    );
} 

export default LoginPage;