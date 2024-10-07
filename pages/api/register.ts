import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const parsedData = RegisterSchema.parse(req.body);

        // Validate the form fields before making the request
        const validatedFields = RegisterSchema.safeParse(parsedData);

        if (!validatedFields.success) {
            return {
                error: "Invalid fields!",
            };
        }

        const { email, password, username } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.status(400).json({ error: "Email is already in use!" });
        }

        await db.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
            },
        });

        // TODO: send verification token via email

        // If successful:
        return res.status(200).json({ success: "Account created successfully!" });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: "Invalid input fields" });
        }
        return res.status(500).json({ error: "Something went wrong" });
    }
}
