import { useState, useEffect } from "react";
import axios from "axios";
import { FullConversationType } from "@/types";

export const useConversations = () => {
    const [conversations, setConversations] = useState<FullConversationType[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get("/api/conversations");
                setConversations(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch conversations", error);
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, []);

    return { conversations, isLoading };
};
