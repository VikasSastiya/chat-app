import { Conversation, Message, User as PrismaUser } from "@prisma/client";

// Enhanced User type with optional group flag
export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
    isGroup?: boolean; // Added to help distinguish group chats
}

// Message type with seen functionality
export type FullMessageType = Message & {
    sender: PrismaUser;
    seenBy: PrismaUser[];
};

// Enhanced Conversation type with group chat properties
export type FullConversationType = Conversation & {
    isGroup: boolean;
    users: User[];
    messages: FullMessageType[];
    groupAdmin?: string; // ID of the user who created the group
    groupName?: string; // Name of the group chat
    groupImage?: string; // Group avatar image
};

// Cloudinary image upload result type
export interface CloudinaryResult {
    info: {
        secure_url: string;
    };
}

// Additional helpful types for group operations
export interface GroupChatData {
    name: string;
    users: string[]; // Array of user IDs
    isGroup: true;
}

export interface DirectMessageData {
    userId: string;
    isGroup: false;
}

export type ConversationData = GroupChatData | DirectMessageData;
