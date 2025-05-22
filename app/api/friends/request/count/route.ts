import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const count = await db.friendRequest.count({
            where: {
                receiverId: session.user.id,
                status: "PENDING",
            },
        });

        return NextResponse.json({ count });
    } catch (error) {
        console.error("[FRIEND_REQUEST_COUNT]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
