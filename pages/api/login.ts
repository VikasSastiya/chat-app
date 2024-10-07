import type { NextApiRequest, NextApiResponse } from "next";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if it's a POST request
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Validate the body of the request using the LoginSchema
    const parsedBody = LoginSchema.safeParse(req.body);

    const validatedFields = LoginSchema.safeParse(parsedBody);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }

    if (!parsedBody.success) {
        return res.status(400).json({ error: "Invalid fields" });
    }

    // Simulate login logic here (e.g., check user credentials, generate JWT, etc.)
    // In a real-world app, this would involve checking a database or another service
    return res.status(200).json({ success: "Login successful!" });
}
