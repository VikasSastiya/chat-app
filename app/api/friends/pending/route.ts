import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all pending requests where the current user is either sender or receiver
    const pendingRequests = await db.friendRequest.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { receiverId: session.user.id }
        ]
      }
    });

    return NextResponse.json(pendingRequests);
  } catch (error) {
    console.error("[PENDING_REQUESTS]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}