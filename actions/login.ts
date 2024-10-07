/*---------------------------- server-side actions --------------------------------*/
// "use server";

// import * as z from "zod";
// import { LoginSchema } from "@/schemas";
// import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { AuthError } from "next-auth";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//     const validatedFields = LoginSchema.safeParse(values);

//     if(!validatedFields.success) {
//         return {
//             error: "Invalid fields!"
//         }
//     }

//     const { email, password } = validatedFields.data;

//     try {
//         await signIn("credentials", {
//             email,
//             password,
//             redirectTo: DEFAULT_LOGIN_REDIRECT,
//         })
//     } catch (error) {
//         if(error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return { error: "Invalid credentials!" }
//                 default:
//                     return { error: "Something went wrong!" }
//             }
//         }

//         throw error;
//     }
// };


/*---------------------------- axios --------------------------------*/
import axios from "axios";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

// Define the expected response type for the login API
interface LoginResponse {
    success?: string;
    error?: string;
}

export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {

    try {
        // Replace with your actual API endpoint in Next.js
        const response = await axios.post<LoginResponse>("/api/login", values);

        if (response.status === 200) {
            return {
                success: response.data.success || "Email sent!",
            };
        }

        return {
            error: response.data.error || "Something went wrong. Please try again.",
        };
    } catch (error: any) {
        return {
            error: error.response?.data?.message || "Failed to log in.",
        };
    }
};