"use client"
import React, {useMemo, useState, useEffect} from 'react';
import {Conversation, User} from "@prisma/client";
import useOtherUser from "@/hooks/users/useOtherUser";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@/components/sidebar/Avatar";
import ProfileDrawer from "@/components/conversations/ProfileDrawer";
import AvatarGroup from "@/components/sidebar/AvatarGroup";
import useActiveList from "@/hooks/utils/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation);
    const [drawOpen, setDrawOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const { members } = useActiveList();

    useEffect(() => {
        if (otherUser?.email) {
            console.log('Current members:', members);
            console.log('Other user email:', otherUser.email);
            setIsActive(members.includes(otherUser.email));
        }
    }, [members, otherUser?.email]);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isActive ? 'Online' : 'Offline';
    }, [conversation.isGroup, conversation.users.length, isActive]);

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawOpen}
                onClose={() => setDrawOpen(false)}
            />
            <div
                className={"bg-white dark:bg-gray-900 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"}>
                <div className={"flex gap-3 items-center"}>
                    <Link 
                        href={"/conversations"}
                        className={"lg:hidden block text-purple-500 hover:text-purple-600 transition cursor-pointer"}
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className={"flex flex-col"}>
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div 
                            className={`text-sm font-light ${
                                isActive
                            }`}
                        >
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal 
                    size={32} 
                    onClick={() => setDrawOpen(true)} 
                    className={"text-purple-500 cursor-pointer hover:text-purple-600 transition"}
                />
            </div>
        </>
    );
};

export default Header;