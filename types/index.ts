import { Conversation, Message, User as PrismaUser } from "@prisma/client";

export type FullMessageType = Message & {
    sender: PrismaUser,
    seenBy: PrismaUser[] // Changed from 'seen' to 'seenBy' to match your schema
}

export type FullConversationType = Conversation & {
    isGroup: boolean
    users: User[]
    messages: FullMessageType[]
  }

export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CloudinaryResult {
    info: {
      secure_url: string;
    };
}
  
