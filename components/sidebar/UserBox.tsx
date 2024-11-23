"use client"

import React, { useCallback, useMemo } from 'react';
import { FullConversationType, User } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Avatar from '@/components/sidebar/Avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import axios from 'axios';
import AvatarGroup from './AvatarGroup';

interface UserBoxProps {
  data: User & { isGroup?: boolean };
  conversations: FullConversationType[];
  selected: boolean;
}

const UserBox: React.FC<UserBoxProps> = ({ data, conversations, selected }) => {
  const session = useSession();
  const router = useRouter();

  const conversation = useMemo(() => {
    if (data.isGroup) {
      return conversations.find(conv => conv.id === data.id);
    }
    
    return conversations.find(conv => 
      !conv.isGroup && 
      conv.users.length === 2 && 
      conv.users.some(user => user.id === data.id)
    );
  }, [conversations, data]);

  const lastMessage = useMemo(() => {
    if (!conversation) return null;
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;
    return lastMessage.seenBy.some((user) => user.email === userEmail);
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) 
      return "Sent an image";
    if (lastMessage?.body) 
      return lastMessage.body.length > 25 ? `${lastMessage.body.substring(0, 25)}...` : lastMessage.body;
    return "Start a conversation";
  }, [lastMessage]);

  const handleClick = useCallback(async () => {
    if (conversation) {
      router.push(`/conversations/${conversation.id}`);
      return;
    }

    try {
      const response = await axios.post('/api/conversations', {
        userId: data.id,
        isGroup: false
      });
      router.push(`/conversations/${response.data.id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  }, [data.id, router, conversation]);

  return (
    <Card className={clsx(
      "w-full transition-shadow duration-300 ease-in-out hover:shadow-lg",
      selected && "bg-blue-100"
    )}>
      <CardContent className="p-3">
        <Button
          variant="ghost"
          className="relative w-full flex items-center gap-3 p-2 rounded-xl hover:bg-transparent focus:bg-transparent active:bg-transparent"
          onClick={handleClick}
        >
          <div className="mt-0.5 flex items-center justify-center">
            {data.isGroup ? (
              <div className="h-12 w-12">
                <AvatarGroup />
              </div>
            ) : (
              <Avatar 
                user={{
                  id: data.id,
                  name: data.name,
                  email: data.email,
                  image: data.image,
                  createdAt: data.createdAt,
                  updatedAt: data.updatedAt
                }}
                size="large"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {data.isGroup ? conversation?.name || 'Group Chat' : data.name}
                </p>
                <p className={clsx(
                  "truncate text-sm mt-1",
                  hasSeen ? "text-gray-500" : "text-gray-900 font-medium"
                )}>
                  {lastMessageText}
                </p>
              </div>
              {lastMessage?.createdAt && (
                <p className="absolute -top-0.5 right-2 text-xs text-gray-500">
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserBox;
