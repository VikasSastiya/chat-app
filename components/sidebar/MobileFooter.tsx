"use client";

import useRoutes from "@/hooks/routes/useRoutes";
import useCurrentUser from "@/hooks/utils/useCurrentUser";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import SettingsModal from "./SettingModal";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes();
    const { user } = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Check if the current route is a specific chat conversation
    const isInFriendChat =
        pathname.startsWith("/conversations/") &&
        pathname !== "/conversations" &&
        pathname !== "/conversations/add" &&
        pathname !== "/conversations/requests";

    return (
        <>
            <SettingsModal
                currentUser={user}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            {/* Only render the MobileFooter if not in a friend's chat conversation */}
            {!isInFriendChat && (
                <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-gray-900 border-t-[1px] lg:hidden">
                    {routes.map((item) => (
                        <MobileItem
                            key={item.label}
                            href={item.href}
                            active={item.active}
                            icon={item.icon}
                            onClick={item.onClick}
                            notificationCount={item.notificationCount || 0}
                        />
                    ))}
                    <div
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer hover:opacity-75 transition p-4"
                    >
                        <Avatar className="h-6 w-6">
                            {user?.image ? (
                                <AvatarImage
                                    src={user.image}
                                    alt={user.name || ""}
                                    style={{ aspectRatio: "1/1" }}
                                    className="object-cover"
                                />
                            ) : (
                                <AvatarFallback>
                                    <div className="relative h-full w-full">
                                        <Image
                                            src="/profile-pic.jpg"
                                            alt={
                                                user?.name?.[0]?.toUpperCase() ||
                                                "?"
                                            }
                                            fill
                                            sizes="(max-width: 24px) 100vw, 24px"
                                            className="object-cover"
                                        />
                                    </div>
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(MobileFooter);
