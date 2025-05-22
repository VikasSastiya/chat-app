import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const friendships = await db.friendship.findMany({
            where: {
                OR: [
                    { userId1: session.user.id },
                    { userId2: session.user.id },
                ],
            },
            include: {
                user1: true,
                user2: true,
            },
        });

        // Get the friend users (excluding the current user)
        const friends = friendships.map((friendship) => {
            return friendship.user1.id === session.user.id
                ? friendship.user2
                : friendship.user1;
        });

        return NextResponse.json(friends);
    } catch (error) {
        console.log(error, "ERROR_FRIENDS");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
