import getCurrentUser from "@/hooks/users/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod"; // Recommended for validation

// Input validation schema
const ConversationSchema = z.object({
  userId: z.string().optional(),
  isGroup: z.boolean().optional().default(false),
  members: z.array(z.object({ value: z.string() })).optional(),
  name: z.string().optional()
});

export async function POST(request: Request) {
  try {
    // Get current user
    const currentUser = await getCurrentUser();

    // Check authentication
    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = ConversationSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedData.error.errors }, 
        { status: 400 }
      );
    }

    const { userId, isGroup, members, name } = validatedData.data;

    // Group conversation creation
    if (isGroup) {
      // Validate group conversation requirements
      if (!members || members.length < 2 || !name) {
        return NextResponse.json(
          { error: "Invalid group conversation data" }, 
          { status: 400 }
        );
      }

      const newGroupConversation = await db.conversation.create({
        data: {
          name,
          isGroup: true,
          adminId: currentUser.id,
          users: {
            connect: [
              ...members.map((member) => ({ id: member.value })),
              { id: currentUser.id }
            ]
          }
        },
        include: {
          users: true
        }
      });

      return NextResponse.json(newGroupConversation);
    }

    // One-on-one conversation logic
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required for one-on-one conversation" }, 
        { status: 400 }
      );
    }

    // Check for existing conversation
    const existingConversations = await db.conversation.findMany({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: userId } } },
          { isGroup: false }
        ]
      },
      include: {
        users: true
      }
    });

    // Return existing conversation if found
    if (existingConversations.length > 0) {
      return NextResponse.json(existingConversations[0]);
    }

    // Create new one-on-one conversation
    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            { id: userId },
            { id: currentUser.id }
          ]
        }
      },
      include: {
        users: true
      }
    });

    return NextResponse.json(newConversation);

  } catch (error) {
    console.error("Conversation Creation Error:", error);
    
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}
