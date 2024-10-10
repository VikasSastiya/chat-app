/*---------------------------- server-side actions --------------------------------*/
"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    const { email, password, username } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return ({ error: "Email is already in use!" });
    }

    await db.user.create({
        data: {
            name: username,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return {
        success: "confirmation email sent!"
    }
}


/*---------------------------- axios --------------------------------*/
// import axios from "axios";
// import * as z from "zod";
// import { RegisterSchema } from "@/schemas";

// // Define the expected response type for the registration API
// interface RegisterResponse {
//     success?: string;
//     error?: string;
// }

// export const register = async (values: z.infer<typeof RegisterSchema>): Promise<RegisterResponse> => {
//     try {
//         // Replace with your actual API endpoint in Next.js
//         const response = await axios.post<RegisterResponse>("/api/register", values);

//         if (response.status === 200) {
//             return {
//                 success: response.data.success || "Account created successfully!",
//             };
//         }

//         return {
//             error: response.data.error || "Something went wrong. Please try again.",
//         };
//     } catch (error: any) {
//         return {
//             error: error.response?.data?.error || "Failed to register.",
//         };
//     }
// };