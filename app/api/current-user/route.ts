import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "ERROR_CURRENT_USER");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
