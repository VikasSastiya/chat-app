"use client"
import React, { Fragment, useMemo, useState } from 'react';
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/hooks/users/useOtherUser";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/components/sidebar/Avatar";
import ConfirmModal from "@/components/conversations/ConfirmModal";
import useActiveList from "@/hooks/utils/useActiveList";
import AvatarGroup from "@/components/sidebar/AvatarGroup";
import useCurrentUser from '@/hooks/utils/useCurrentUser';

interface ProfileDrawerProps {
    isOpen: boolean,
    onClose: () => void,
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
    const otherUser = useOtherUser(data);
    const { members } = useActiveList();
    const isActive = otherUser?.email ? members.indexOf(otherUser.email) !== -1 : false;
    const user = useCurrentUser();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const joinedData = useMemo(() => {
        return otherUser?.createdAt ? format(new Date(otherUser.createdAt), 'PP') : 'N/A';
    }, [otherUser?.createdAt]);

    const createdAtData = useMemo(() => {
        return data.createdAt ? format(new Date(data.createdAt), 'PP') : 'N/A'; // Format createdAt
    }, [data.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser?.name || 'Unknown User';
    }, [data.name, otherUser?.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }
        return isActive ? 'Online' : 'Offline';
    }, [data.isGroup, data.users.length, isActive]);

    const adminId = data.adminId;
    const currentUserId = user.user?.id;
    const isAdmin = adminId === currentUserId;

    return (
        <>
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col bg-white dark:bg-gray-900 overflow-y-scroll py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            onClick={onClose}
                                                            type="button"
                                                            className="rounded-md bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            <span className="sr-only">Close Panel</span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    {data.isGroup ? (
                                                        <AvatarGroup />
                                                    ) : (
                                                        <Avatar user={otherUser} />
                                                    )}
                                                    <div>{title}</div>
                                                    <div className="text-sm text-gray-500">{ statusText }</div>
                                                    <div className="flex gap-10 my-8">
                                                        {(data.isGroup && isAdmin) || (!data.isGroup) ? (
                                                            <div
                                                                onClick={() => setConfirmOpen(true)}
                                                                className="flex flex-col gap-3 items-center cursor-pointer"
                                                            >
                                                                <div className="w-10 h-10 bg-neutral-100 dark:bg-gray-900 rounded-full flex items-center justify-center hover:opacity-75 transition">
                                                                    <IoTrash size={20} />
                                                                </div>
                                                                <div className="text-sm font-light text-neutral-600 dark:text-gray-100">
                                                                    Delete Conversation
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                            {data.isGroup && (
                                                                <>
                                                                    <div className='text-center'>
                                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-100 sm:w-full sm:flex-shrink-0">
                                                                            Created At
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                                            <time dateTime={data.createdAt.toISOString()}>
                                                                                {createdAtData}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                    <hr className="my-2" />
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-100 sm:w-40 sm:flex-shrink-0">
                                                                            Admin
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                                            <div className="flex items-center space-x-2">
                                                                                {data.users
                                                                                    .filter(user => user.id === adminId) // Only show admin
                                                                                    .map(user => (
                                                                                        <div key={user.id} className={`flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition w-full cursor-pointer`}>
                                                                                            <Avatar user={user} />
                                                                                            <span className="text-sm font-medium">{user.name}</span>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </dd>
                                                                    </div>
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-100 sm:w-40 sm:flex-shrink-0">
                                                                            Members
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                                            <div className="flex flex-col gap-2">
                                                                                {data.users
                                                                                    .filter(user => user.id !== adminId) // Exclude admin from members
                                                                                    .map(user => (
                                                                                        <div key={user.id} className={`flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition w-full cursor-pointer`}>
                                                                                            <Avatar user={user} />
                                                                                            <span className="text-sm font-medium">{user.name}</span>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-2 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                                        {otherUser?.email || 'N/A'}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-2 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                                            <time dateTime={joinedData}>
                                                                                {joinedData}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProfileDrawer;
