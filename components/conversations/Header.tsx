"use client"
import React, {useMemo, useState} from 'react';
import {Conversation, User} from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@/components/sidebar/Avatar";
import ProfileDrawer from "@/components/conversations/ProfileDrawer";
// import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation);
    const [drawOpen, setDrawOpen] = useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return isActive ? 'Active' : "Offline";
    }, [conversation.isGroup, conversation.users.length, isActive]);

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawOpen}
                onClose={() => setDrawOpen(false)}
            />
            <div
                className={"bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"}>
                <div className={"flex gap-3 items-center"}>
                    <Link href={"/conversations"}
                          className={"lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"}>
                        <HiChevronLeft size={32}/>
                    </Link>
                    <Avatar user={{
                        name: otherUser.name || null,
                        email: otherUser.email || null,
                        image: otherUser.image || null
                    }}/>
                    <div className={"flex flex-col"}>
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className={"text-sm font-light text-neutral-500"}>
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal size={32} onClick={() => setDrawOpen(true)} className={"text-sky-500 cursor-pointer hover:text-sky-600 transition"}/>
            </div>
        </>
    );
};

export default Header;