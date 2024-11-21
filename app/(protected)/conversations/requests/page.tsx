import { FriendRequests } from '@/components/Friend-requests';
import { Metadata } from 'next';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Friend Requests',
  description: 'Manage your friend requests',
};

export default async function RequestsPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Friend Requests</h1>
        <p className="text-muted-foreground">
          Manage your incoming friend requests
        </p>
      </div> */}
      <FriendRequests userId={session.user.id} />
    </div>
  );
}