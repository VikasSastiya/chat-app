import FriendSearch from '@/components/FriendSearch';

export default function FriendsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-4 pb-8">
      <div className="container mx-auto">
        <FriendSearch />
      </div>
    </div>
  );
}