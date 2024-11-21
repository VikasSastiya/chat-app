import Sidebar from "@/components/sidebar/Sidebar";
import FriendList from "@/components/sidebar/FriendList";
import getConversations from "@/hooks/conversations/getConversations";
import MobileNavigationWrapper from "@/components/MobileNavigationWrapper";

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
      <MobileNavigationWrapper>
        <div className="h-full">
          <FriendList conversations={conversations} />
        </div>
        {children}
      </MobileNavigationWrapper>
    </Sidebar>
  );
}