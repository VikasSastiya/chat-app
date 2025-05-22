import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await db.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                users: {
                    some: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seenBy: true,
                    },
                },
            },
        });

        return conversations.map((conversation) => ({
            ...conversation,
            isGroup: !!conversation.isGroup, // Convert null/undefined to false
        }));
    } catch (error: any) {
        return [];
    }
};

export default getConversations;
