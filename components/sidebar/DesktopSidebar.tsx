'use client';

import useRoutes from "@/hooks/routes/useRoutes";
import useCurrentUser from "@/hooks/utils/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DesktopItem from "./DesktopItem";
import Image from "next/image";
import SettingsModal from "./SettingModal";
import { useState } from "react";
import ThemeSwitch from '../ThemeSwitch'

const DesktopSidebar = () => {
    const routes = useRoutes();
    const { user } = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SettingsModal currentUser={user} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white dark:bg-gray-900 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                        <div className="mb-4 relative cursor-pointer" onClick={() => setIsOpen(true)}>
                            <Avatar className="h-12 w-12">
                                {user?.image ? (
                                    <AvatarImage 
                                        src={user.image} 
                                        alt={user.name || ''} 
                                        style={{ aspectRatio: "1/1" }} 
                                        className="object-cover" 
                                    />
                                ) : (
                                    <AvatarFallback>
                                        <div className="relative h-full w-full">
                                            <Image
                                                src="/profile-pic.jpg"
                                                alt={user?.name?.[0]?.toUpperCase() || '?'}
                                                fill
                                                sizes="(max-width: 48px) 100vw, 48px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                        </div>
                        <ul
                            role="list"
                            className="flex flex-col items-center space-y-1"
                        >
                            {routes.map((item) => (
                                <DesktopItem
                                    key={item.label}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    active={item.active}
                                    onClick={item.onClick}
                                    notificationCount={item.notificationCount || 0}
                                />
                            ))}
                            <li>
                                <ThemeSwitch />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default DesktopSidebar;
