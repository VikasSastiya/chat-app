import React from "react";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";
import getConversations from "@/hooks/getConversations";
import getUsers from "@/hooks/getUsers"; // Create this hook to fetch users

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    const users = await getUsers(); // Add this line

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    initialItems={conversations} 
                    users={users} // Add this prop
                />
                {children}
            </div>
        </Sidebar>
    );
}
