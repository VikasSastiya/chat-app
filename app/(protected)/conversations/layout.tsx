import Sidebar from "@/components/sidebar/Sidebar";
import FriendList from "@/components/sidebar/FriendList";
import getConversations from "@/hooks/conversations/getConversations";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = (await getConversations()).map(conversation => ({
    ...conversation,
    isGroup: !!conversation.isGroup,
    users: conversation.users.map(user => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }));

  return (
    <Sidebar>
      <div className="h-full">
        <FriendList 
          conversations={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}