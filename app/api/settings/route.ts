import { NextResponse } from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { name, image } = body;

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updateData: { name?: string; image?: string } = {};
        
        if (name !== undefined) {
            updateData.name = name;
        }
        
        if (image !== undefined && image !== currentUser.image) {
            updateData.image = image;
        }

        const updatedUser = await db.user.update({
            where: {
                id: currentUser.id
            },
            data: updateData
        });

        return NextResponse.json(updatedUser);
    } catch (error: unknown) {
        console.log(error, "ERROR_SETTINGS");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
