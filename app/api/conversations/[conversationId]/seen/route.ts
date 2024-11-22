import {NextResponse} from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

interface IParams {
    conversationId?: string
}

export async function POST(request: Request, { params }: { params: IParams } ) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the existing conversation
        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seenBy: true
                    }
                },
                users: true
            }
        });

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        // Find last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        // Ensure lastMessage includes seenIds
        const lastMessageWithSeenIds = {
            ...lastMessage,
            seenIds: lastMessage.seenBy.map(user => user.id) // Extract seenIds from seenBy
        };

        // Update seen of last message
        const updatedMessage = await db.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seenBy: true
            },
            data: {
                seenBy: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });

        if (lastMessageWithSeenIds.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);

        return NextResponse.json(updatedMessage);
    } catch (error: unknown) {
        console.log(error, "ERROR_MESSAGE_SEEN");
        return new NextResponse("Internal Error", { status: 500 });
    }
}