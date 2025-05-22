import { db } from "@/lib/db";

const getUsers = async () => {
    try {
        const users = await db.user.findMany({
            orderBy: {
                name: "asc",
            },
        });

        return users;
    } catch {
        return [];
    }
};

export default getUsers;
