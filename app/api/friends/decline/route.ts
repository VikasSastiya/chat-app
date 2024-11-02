import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { requestId } = await req.json();
        if (!requestId) {
            return new NextResponse("Request ID is required", { status: 400 });
        }

        // Get the friend request
        const friendRequest = await db.friendRequest.findUnique({
            where: { id: requestId }
        });

        if (!friendRequest) {
            return new NextResponse("Friend request not found", { status: 404 });
        }

        // Verify the current user is the receiver
        if (friendRequest.receiverId !== session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Delete the friend request
        await db.friendRequest.delete({
            where: { id: requestId }
        });

        return NextResponse.json({ message: "Friend request declined" });
    } catch (error) {
        console.error("[DECLINE_FRIEND]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}