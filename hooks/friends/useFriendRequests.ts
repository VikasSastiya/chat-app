import { useEffect, useState } from "react";
import axios from "axios";

const useFriendRequests = () => {
    const [pendingRequests, setPendingRequests] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("/api/friends/request/count");
                setPendingRequests(response.data.count);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();

        // Optional: Set up polling to check for new requests
        const interval = setInterval(fetchRequests, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return { pendingRequests };
};

export default useFriendRequests;
