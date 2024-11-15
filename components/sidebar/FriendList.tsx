"use client";

import { useMemo, useState } from 'react';
import UserBox from "./UserBox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import clsx from "clsx";
import { FullConversationType } from "@/types";
import useFriends from '@/hooks/users/useFriend';
import { UserBoxSkeleton } from './UserBoxSkeleton';
import GroupChatModal from '@/components/sidebar/GroupChatModal';

interface FriendListProps {
  conversations: FullConversationType[];
}

interface GroupType extends FullConversationType {
  updatedAt?: Date;
}

export default function FriendList({ conversations }: FriendListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen } = useConversation();
  const { friends, isLoading } = useFriends();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { directMessages, groups } = useMemo(() => {
    const groups = conversations.filter(conv => conv.isGroup);
    const directMessages = conversations.filter(conv => !conv.isGroup);
    
    return { directMessages, groups };
  }, [conversations]);

  const sortedFriends = useMemo(() => {
    return [...friends].sort((friendA, friendB) => {
      const conversationA = directMessages.find(conv => 
        conv.users.length === 2 && 
        conv.users.some(user => user.id === friendA.id)
      );
      
      const conversationB = directMessages.find(conv => 
        conv.users.length === 2 && 
        conv.users.some(user => user.id === friendB.id)
      );

      const timeA = conversationA?.messages?.[conversationA.messages.length - 1]?.createdAt || 
                    conversationA?.createdAt || 
                    new Date(0);
      const timeB = conversationB?.messages?.[conversationB.messages.length - 1]?.createdAt || 
                    conversationB?.createdAt || 
                    new Date(0);

      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });
  }, [friends, directMessages]);

  const filteredItems = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    
    const filteredFriends = sortedFriends.filter(friend => 
      friend.name?.toLowerCase().includes(searchLower) ||
      friend.email?.toLowerCase().includes(searchLower)
    );

    const filteredGroups = groups.filter(group => 
      group.name?.toLowerCase().includes(searchLower)
    );

    return { filteredFriends, filteredGroups };
  }, [sortedFriends, groups, searchTerm]);

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

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={friends}
      />
      <aside className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r",
        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        "transition-all duration-300 ease-in-out",
        isOpen ? "hidden" : "block w-full left-0"
      )}>
        <div className="px-5">
          {/* Search and Header Section */}
          <div className="sticky top-0 pt-4 pb-2 bg-white dark:bg-gray-900 z-10">
            <div className="relative flex items-center mb-6">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 dark:text-gray-500" size={20} />
              </div>
              <Input 
                placeholder="Search conversations..." 
                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Conversations
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {filteredItems.filteredFriends.length + filteredItems.filteredGroups.length}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)} 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
              >
                <MdOutlineGroupAdd className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Groups Section */}
          {filteredItems.filteredGroups.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Groups
              </h3>
              <nav className="space-y-2">
                {filteredItems.filteredGroups.map((group) => (
                  <UserBox 
                    key={group.id} 
                    data={{ ...group, isGroup: true, updatedAt: (group as GroupType).updatedAt || new Date() }}
                    conversations={conversations}
                    selected={false}
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Direct Messages Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Direct Messages
            </h3>
            {filteredItems.filteredFriends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  No conversations found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Try a different search term
                </p>
              </div>
            ) : (
              <nav className="space-y-2 pb-6">
                {filteredItems.filteredFriends.map((friend) => (
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
        </div>
      </aside>
    </>
  );
}
