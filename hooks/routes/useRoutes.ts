import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { HiChat, HiUserAdd } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
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
        const interval = setInterval(fetchRequestCount, 60000); // Poll every minute
        return () => clearInterval(interval);
    }, []);

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || pathname.startsWith('/conversations/') && pathname !== '/conversations/add' && pathname !== '/conversations/requests'
        },
        {
            label: 'Users',
            href: '/conversations/add',
            icon: HiUserAdd,
            active: pathname === '/conversations/add'
        },
        {
            label: 'Friend Requests',
            href: '/conversations/requests',
            icon: HiUsers,
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
