import Sidebar from "@/components/sidebar/Sidebar";
import FriendList from "@/components/sidebar/FriendList";
import getConversations from "@/hooks/getConversations";
import getFriends from "@/hooks/getFriends";

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
  const friends = await getFriends();

  return (
    <Sidebar>
      <div className="h-full">
        <FriendList 
          initialFriends={friends}
          conversations={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}