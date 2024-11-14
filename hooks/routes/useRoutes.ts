import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { HiChat, HiUserAdd, HiUserGroup } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import axios from "axios";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();
    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {
                const { data } = await axios.get('/api/friends/request/count');
                setRequestCount(data.count);
            } catch (error) {
                console.error("Error fetching friend request count:", error);
            }
        };
        
        fetchRequestCount();
        const interval = setInterval(fetchRequestCount, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations'
        },
        {
            label: 'Users',
            href: '/conversations/add',
            icon: HiUserAdd,
            active: pathname === '/conversations/add' || !!conversationId
        },
        {
            label: 'Friend Requests',
            href: '/conversations/requests',
            icon: HiUserGroup,
            active: pathname === '/conversations/requests',
            notificationCount: requestCount
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId, requestCount]);

    return routes;
};

export default useRoutes;
