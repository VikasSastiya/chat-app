import { NextResponse } from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        
        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Start with current values as defaults
        const updateData = {
            name: currentUser.name,
            image: currentUser.image
        };
        
        // Only override fields that are provided in the request
        if ('name' in body) {
            updateData.name = body.name;
        }
        
        if ('image' in body) {
            updateData.image = body.image;
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
