import Sidebar from "@/components/sidebar/Sidebar";
import FriendList from "@/components/sidebar/FriendList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <FriendList />
        {children}
      </div>
    </Sidebar>
  );
}