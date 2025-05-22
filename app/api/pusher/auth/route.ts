// app/api/pusher/auth/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Handle both JSON and form data
        let socket_id: string;
        let channel_name: string;

        const contentType = req.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            const body = await req.json();
            socket_id = body.socket_id;
            channel_name = body.channel_name;
        } else {
            const formData = await req.formData();
            socket_id = formData.get("socket_id") as string;
            channel_name = formData.get("channel_name") as string;
        }

        if (!socket_id || !channel_name) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const headersList = headers();
        const origin = headersList.get("origin");

        const authResponse = pusherServer.authorizeChannel(
            socket_id,
            channel_name,
            {
                user_id: session.user.email,
                user_info: {
                    email: session.user.email,
                    name: session.user.name || undefined,
                },
            },
        );

        return NextResponse.json(authResponse, {
            headers: {
                "Access-Control-Allow-Origin": origin || "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    } catch (error) {
        console.error("[PUSHER_AUTH] Error:", error);
        return new NextResponse(
            `Internal Error: ${error instanceof Error ? error.message : "Unknown error"}`,
            { status: 500 },
        );
    }
}

export async function OPTIONS() {
    const headersList = headers();
    const origin = headersList.get("origin");

    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}
