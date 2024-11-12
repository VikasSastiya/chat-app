"use client"
import React, {useState} from 'react';
import {FullMessageType} from "@/types";
import {useSession} from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/components/sidebar/Avatar";
import {format} from "date-fns";
import Image from "next/image";
import ImageModal from "@/components/conversations/ImageModal";

interface MessageBoxProps {
    data: FullMessageType,
    isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({data, isLast}) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seenBy || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    // Ensure sender always has required properties
    const sender = {
        ...data.sender,
        image: data.sender?.image || '/profile-pic.jpg'
    };

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    );

    const avatar = clsx(
        "flex-shrink-0",
        isOwn && "order-2"
    );

    const body = clsx(
        "flex flex-col gap-1",
        isOwn && "items-end"
    );

    const message = clsx(
        "text-sm w-fit overflow-hidden relative",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    const timestamp = clsx(
        "text-xs text-gray-400 mt-1",
        isOwn ? "text-right" : "text-left"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar 
                    user={sender}
                    size="medium"
                />
            </div>
            <div className={body}>
                <div className={message}>
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
                        <div>{data.body}</div>
                    )}
                </div>
                <div className={timestamp}>
                    {format(new Date(data.createdAt), 'p')}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500 mt-1">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBox;