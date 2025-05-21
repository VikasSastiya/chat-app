"use client"

import React, { useState } from 'react';
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/components/sidebar/Avatar";
import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";
import Image from "next/image";
import ImageModal from "@/components/conversations/ImageModal";
import { motion } from "framer-motion";

interface MessageBoxProps {
    data: FullMessageType,
    isLast?: boolean,
    previousMessage?: FullMessageType | null
}

export default function MessageBox({
    data, 
    isLast,
    previousMessage
}: MessageBoxProps) {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seenBy || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    const sender = {
        ...data.sender,
        image: data.sender?.image || '/profile-pic.jpg'
    };

    const container = "flex gap-3 py-[2px] px-2"; // Minimal vertical padding

    const avatar = "flex-shrink-0";

    const body = "flex flex-col gap-[2px]"; // Reduced gap between messages

    const message = clsx(
        "text-sm w-fit overflow-hidden relative",
        isOwn ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-900",
        data.image ? "rounded-lg p-0" : "rounded-lg py-1.5 px-3 pb-5" // More rectangular with slight rounded corners
    );

    const getDisplayDate = (date: Date) => {
        if (isToday(date)) {
            return "Today";
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else {
            return format(date, 'dd MMMM yyyy');
        }
    };

    const currentMessageDate = new Date(data.createdAt);
    const displayDate = getDisplayDate(currentMessageDate);

    const showDatePartition = previousMessage && 
        getDisplayDate(new Date(previousMessage.createdAt)) !== displayDate;

    const showAvatar = !previousMessage || 
        previousMessage.sender.email !== data.sender.email ||
        differenceInMinutes(currentMessageDate, new Date(previousMessage.createdAt)) >= 1;

    return (
        <div className={`${container}`}>
            {showDatePartition && (
                <div className="w-full my-2 text-center">
                    <div className="relative">
                        <hr className="border-gray-300" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-100">
                            {displayDate}
                        </span>
                    </div>
                </div>
            )}
            <div className={clsx(avatar, !showAvatar && "invisible")}>
                <Avatar 
                    user={sender}
                    size="medium"
                />
            </div>
            <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${body} `}>
                <div className={clsx(message, "relative min-w-[60px]")}> {/* Added min-width for short messages */}
                    <ImageModal 
                        isOpen={imageModalOpen} 
                        src={data.image} 
                        alt="Image" 
                        onClose={() => setImageModalOpen(false)} 
                    />
                    {data.image ? (
                        <Image 
                            onClick={() => setImageModalOpen(true)}
                            src={data.image}
                            alt="Image"
                            height={288}
                            width={288}
                            className="object-cover cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div className="pr-12">{data.body}</div>
                    )}
                    <div className="absolute bottom-1 right-2 text-[11px] opacity-60">
                        {format(currentMessageDate, 'HH:mm')}
                    </div>
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500 dark:text-gray-100 mt-0.5">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </motion.div>
        </div>
    );
}