"use client";

import { useState } from 'react';
import UserBox from "./UserBox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";
import { User } from "@prisma/client";
import { FullConversationType } from "@/types";

interface FriendListProps {
  initialFriends: User[];
  conversations: FullConversationType[];
}

export default function FriendList({ initialFriends, conversations }: FriendListProps) {
  const [friends] = useState(initialFriends);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen } = useConversation();

  const filteredFriends = friends.filter(friend => 
    friend.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={clsx(
      "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r",
      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
      "transition-all duration-300 ease-in-out",
      isOpen ? "hidden" : "block w-full left-0"
    )}>
      <div className="px-5">
        <div className="sticky top-0 pt-4 pb-2 bg-white dark:bg-gray-900 z-10">
          <div className="relative flex items-center mb-6">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 dark:text-gray-500" size={20} />
            </div>
            <Input 
              placeholder="Search friends..." 
              className="pl-10 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Friends
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {filteredFriends.length}
            </span>
          </div>
        </div>

        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              No friends found
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Try a different search term
            </p>
          </div>
        ) : (
          <nav className="space-y-2 pb-6">
            {filteredFriends.map((friend) => (
              <UserBox 
                key={friend.id} 
                data={friend} 
                conversations={conversations}
                selected={false}
              />
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
