'use client';

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import useCurrentUser from "@/hooks/useCurrentUser";
import MobileItem from "./MobileItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();
    const { user } = useCurrentUser();

    if(isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            {routes.map((route) => (
                <MobileItem 
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
            <div className="flex items-center justify-center p-2">
                <Avatar className="h-8 w-8">
                    {user?.image ? (
                        <AvatarImage src={user.image} alt={user.name || ''} />
                    ) : (
                        <AvatarFallback className="bg-sky-500 text-white">
                            {user?.name?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                    )}
                </Avatar>
            </div>
        </div>
    );
}

export default MobileFooter;