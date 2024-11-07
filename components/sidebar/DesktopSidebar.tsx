'use client';

import useRoutes from "@/hooks/useRoutes";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DesktopItem from "./DesktopItem";
import Image from "next/image";

const DesktopSidebar = () => {
    const routes = useRoutes();
    const { user } = useCurrentUser();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
            <nav className="mt-4 flex flex-col justify-between h-full">
                <div className="flex flex-col items-center">
                    <div className="mb-4 relative">
                        <Avatar className="h-12 w-12">
                            {user?.image ? (
                                <AvatarImage src={user.image} alt={user.name || ''} />
                            ) : (
                                // <AvatarFallback className="bg-sky-500 text-white">
                                //     {user?.name?.[0]?.toUpperCase() || '?'}
                                // </AvatarFallback>
                                <AvatarFallback>
                                    <div className="relative h-full w-full">
                                        <Image
                                            src="/profile-pic.jpg"
                                            alt={user?.name?.[0]?.toUpperCase() || '?'}
                                            fill
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
                            />
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default DesktopSidebar;
