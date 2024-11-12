"use client"

import React, { useCallback, useMemo } from 'react';
import { FullConversationType, User } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import axios from 'axios';

interface UserBoxProps {
  data: User,
  conversations: FullConversationType[],
  selected: boolean
}

const UserBox: React.FC<UserBoxProps> = ({ data, conversations, selected }) => {
    const session = useSession();
    const router = useRouter();

    const existingConversation = useMemo(() => {
        return conversations.find(conversation => 
            conversation.users.some(user => user.id === data.id)
        )
    }, [conversations, data.id]);

    const lastMessage = useMemo(() => {
        if (!existingConversation) return null;
        const messages = existingConversation.messages || [];
        return messages[messages.length - 1];
    }, [existingConversation]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;
        const seenArray = lastMessage.seenBy || [];
        if (!userEmail) return false;
        return seenArray.some((seenUser) => seenUser.email === userEmail);
    }, [userEmail, lastMessage]);    

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }
        if (lastMessage?.body) {
            return lastMessage.body;
        }
        return "Start a conversation";
    }, [lastMessage]);

    const handleClick = useCallback(async () => {
        if (existingConversation) {
            router.push(`/conversations/${existingConversation.id}`);
            return;
        }

        try {
            const response = await axios.post('/api/conversations', { userId: data.id });
            router.push(`/conversations/${response.data.id}`);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    }, [data.id, router, existingConversation]);

    return (
      <Card className={clsx("w-full", { "bg-blue-100": selected })}>
          <CardContent className="p-3">
              <Button
                  variant="ghost"
                  className="relative w-full flex items-center gap-4 p-2 rounded-xl"
                  onClick={handleClick}
              >
                  <div className="relative shrink-0">
                      <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-800">
                          <AvatarImage 
                              src={data.image || undefined} 
                              alt={data.name || 'User'} 
                              className="object-cover"
                              loading="eager"
                              draggable="false"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-medium">
                              {data.name?.[0] || 'U'}
                          </AvatarFallback>
                      </Avatar>
                  </div>
  
                  <div className="min-w-0 flex-1">
                      <div className="focus:outline-none">
                          <div className="flex flex-col items-start">
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {data.name}
                              </p>
                              <p className={clsx(
                                  "truncate text-sm mt-1",
                                  hasSeen 
                                      ? "text-gray-500 dark:text-gray-400" 
                                      : "text-gray-900 dark:text-gray-100 font-medium"
                              )}>
                                  {lastMessageText}
                              </p>
                          </div>
                          {lastMessage?.createdAt && (
                              <p className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400">
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
