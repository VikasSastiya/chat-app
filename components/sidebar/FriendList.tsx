"use client";
// import { User } from "@prisma/client";
import UserBox from "./UserBox";
import useFriends from "@/hooks/useFriend";
import { UserBoxSkeleton } from "./UserBoxSkeleton";
// import LoadingModal from "@/components/LoadingModal";

export default function FriendList() {
  const { friends, isLoading } = useFriends()

  if (isLoading) {
    return (
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5 mt-16">
          {[...Array(5)].map((_, i) => (
            <UserBoxSkeleton key={i} />
          ))}
        </div>
      </aside>
    );
  }

  // if (isLoading) {
  //   return <LoadingModal />;
  // }

  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-black py-4">Friends</div>
        </div>
        <nav className="flex flex-col space-y-2">
          {friends.map((friend) => (
            <UserBox key={friend.id} data={friend} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
