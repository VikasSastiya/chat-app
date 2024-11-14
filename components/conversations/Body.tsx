"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FullMessageType } from "@/types";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import MessageBox from "@/components/conversations/MessageBox";
import axios from "axios";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages] = useState<FullMessageType[]>(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && (
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
            )}
            
            {messages.map((message, i) => (
                <MessageBox 
                    isLast={i === messages.length - 1} 
                    key={message.id} 
                    data={message} 
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
};

export default Body;
