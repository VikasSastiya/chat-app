"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const useFriends = () => {
    const [friends, setFriends] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch("/api/friends");
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFriends();
    }, []);

    return { friends, isLoading };
};

export default useFriends;
