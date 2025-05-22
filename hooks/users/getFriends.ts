import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";

export default async function getFriends() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const friendships = await db.friendship.findMany({
            where: {
                OR: [{ userId1: currentUser.id }, { userId2: currentUser.id }],
            },
            include: {
                user1: true,
                user2: true,
            },
        });

        const friends = friendships.map((friendship) =>
            friendship.userId1 === currentUser.id
                ? friendship.user2
                : friendship.user1,
        );

        return friends;
    } catch (error) {
        return [];
    }
}
