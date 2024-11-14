'use client';

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

// Define a type that matches the exact structure you need
type SafeUser = Omit<User, "name" | "email" | "image"> & {
    name: string | null;
    email: string | null;
    image: string | null;
};

const useCurrentUser = () => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/current-user');
                const data = await response.json();
                setUser(data as SafeUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isLoading };
};

export default useCurrentUser;
