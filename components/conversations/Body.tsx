"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FullMessageType } from "@/types";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import MessageBox from "@/components/conversations/MessageBox";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns";
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';

interface BodyProps {
    initialMessages: FullMessageType[]
}

export default function Component({ initialMessages }: BodyProps) {
    const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    const scrollToBottom = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const scrollHeight = scrollElement.scrollHeight;
            const height = scrollElement.clientHeight;
            const maxScrollTop = scrollHeight - height;
            scrollElement.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        const shouldScrollToBottom = scrollRef.current && (
            scrollRef.current.scrollTop + scrollRef.current.clientHeight + 100
            >= scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        );

        if (shouldScrollToBottom) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;

        pusherClient.subscribe(conversationId);

        const messageHandler = (message: FullMessageType) => {
            if (message.conversationId === conversationId) {
                setMessages((current) => {
                    if (find(current, { id: message.id })) {
                        return current;
                    }
                    return [...current, message];
                });

                bottomRef?.current?.scrollIntoView();
            }
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            if (newMessage.conversationId === conversationId) {
                setMessages((current) => current.map((currentMessage) => {
                    if (currentMessage.id === newMessage.id) {
                        return newMessage;
                    }
                    return currentMessage;
                }));
            }
        };

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        };
    }, [conversationId]);

    const groupedMessages = messages.reduce((acc, message) => {
        const date = new Date(message.createdAt);
        const dateKey = isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, 'dd MMMM yyyy');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(message);
        return acc;
    }, {} as Record<string, FullMessageType[]>);

    return (
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4"
        >
            {Object.keys(groupedMessages).length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-3 px-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Your conversation starts now
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Send your first message to begin
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {Object.entries(groupedMessages).map(([date, msgs]) => (
                        <div key={date} className="mb-6">
                            <div className="text-center mb-6">
                                <div className="inline-block bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {date}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-4 md:w-2/3'>
                                {msgs.map((message, i) => (
                                    <MessageBox 
                                        isLast={i === msgs.length - 1} 
                                        key={message.id} 
                                        data={message} 
                                        previousMessage={i > 0 ? msgs[i - 1] : null}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} className="pt-24" />
                </>
            )}
        </div>
    );
}