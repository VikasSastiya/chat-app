import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { receiverId } = body;

    if (!receiverId) {
      return NextResponse.json({ error: "Receiver ID is required" }, { status: 400 });
    }

    // Check if users are the same
    if (session.user.id === receiverId) {
      return NextResponse.json({ error: "Cannot send friend request to yourself" }, { status: 400 });
    }

    // Check if users are already friends
    const existingFriendship = await db.friendship.findFirst({
      where: {
        OR: [
          { userId1: session.user.id, userId2: receiverId },
          { userId1: receiverId, userId2: session.user.id }
        ]
      }
    });

    if (existingFriendship) {
      return NextResponse.json({ error: "Already friends" }, { status: 400 });
    }

    // Check if there's a pending request
    const existingRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: receiverId },
          { senderId: receiverId, receiverId: session.user.id }
        ]
      }
    });

    if (existingRequest) {
      return NextResponse.json({ error: "Friend request already exists" }, { status: 400 });
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}