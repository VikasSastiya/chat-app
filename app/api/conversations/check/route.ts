import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import getCurrentUser from "@/hooks/users/getCurrentUser";

export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 },
            );
        }

        // Check for an existing conversation
        const existingConversation = await db.conversation.findFirst({
            where: {
                AND: [
                    { users: { some: { id: currentUser.id } } },
                    { users: { some: { id: userId } } },
                    { isGroup: false },
                ],
            },
            include: {
                users: true,
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        return NextResponse.json({
            exists: !!existingConversation,
            conversation: existingConversation,
        });
    } catch (error) {
        console.error("Conversation Check Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
