// app/api/friends/search.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return new NextResponse("Search query is required", { status: 400 });
        }

        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Debug: Log the search query and current user
        // console.log("Search Query:", query);
        console.log("Current User ID:", session.user.id);

        // Debug: First check if there are any users at all (excluding current user)
        // const allUsers = await db.user.findMany({
        //     where: {
        //         id: { not: session.user.id }
        //     },
        //     select: {
        //         id: true,
        //         name: true,
        //         email: true
        //     }
        // });
        // console.log("All available users:", allUsers);

        // Debug: Try a simpler search first
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
                image: true
            }
        });

        console.log("Search results:", users);

        return NextResponse.json(users);
    } catch (error) {
        console.error("[SEARCH_USERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}