import {NextResponse} from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";

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

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

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

        // if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
        //     return NextResponse.json(conversation);
        // }

        return NextResponse.json(updatedMessage);
    } catch (error: unknown) {
        console.log(error, "ERROR_MESSAGE_SEEN");
        return new NextResponse("Internal Error", { status: 500 });
    }
}