// app/api/friends/search.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return new NextResponse("Search query is required", { status: 400 });
        }

        const users = await db.user.findMany({
            where: {
                OR: [
                    { email: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                ],
                AND: {
                    id: { not: session.user.id }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                friendships1: {
                    where: {
                        OR: [
                            { userId2: session.user.id },
                            { userId1: session.user.id }
                        ]
                    }
                },
                friendships2: {
                    where: {
                        OR: [
                            { userId2: session.user.id },
                            { userId1: session.user.id }
                        ]
                    }
                },
                friendRequestsSent: {
                    where: { receiverId: session.user.id }
                },
                friendRequestsReceived: {
                    where: { senderId: session.user.id }
                }
            }
        });

        const enrichedUsers = users.map(user => ({
            ...user,
            isFriend: user.friendships1.length > 0 || user.friendships2.length > 0,
            friendRequestStatus: {
                status: 
                    user.friendRequestsSent.length > 0 || user.friendRequestsReceived.length > 0 
                        ? 'PENDING' 
                        : null,
                senderId: user.friendRequestsSent.length > 0 
                    ? user.id 
                    : user.friendRequestsReceived.length > 0 
                    ? session.user.id 
                    : null
            }
        }));

        return NextResponse.json(enrichedUsers);
    } catch (error) {
        console.error("[SEARCH_USERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}