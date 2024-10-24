import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { receiverId } = await req.json();
        if (!receiverId) {
            return new NextResponse("Receiver ID is required", { status: 400 });
        }

        // Check if users are already friends
        const existingFriendship = await db.friendship.findFirst({
            where: {
                OR: [
                    {
                        userId1: session.user.id,
                        userId2: receiverId
                    },
                    {
                        userId1: receiverId,
                        userId2: session.user.id
                    }
                ]
            }
        });

        if (existingFriendship) {
            return new NextResponse("Already friends", { status: 400 });
        }

        // Check if there's a pending request
        const existingRequest = await db.friendRequest.findFirst({
            where: {
                OR: [
                    {
                        senderId: session.user.id,
                        receiverId: receiverId
                    },
                    {
                        senderId: receiverId,
                        receiverId: session.user.id
                    }
                ]
            }
        });

        if (existingRequest) {
            return new NextResponse("Friend request already exists", { status: 400 });
        }

        // Create friend request
        const friendRequest = await db.friendRequest.create({
            data: {
                senderId: session.user.id,
                receiverId: receiverId
            }
        });

        return NextResponse.json(friendRequest);
    } catch (error) {
        console.error("[FRIEND_REQUEST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}