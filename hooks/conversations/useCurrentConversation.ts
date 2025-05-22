import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        // More explicit type checking
        if (!params?.conversationId || Array.isArray(params.conversationId)) {
            return "";
        }

        return params.conversationId;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(
        () => ({
            isOpen,
            conversationId,
        }),
        [isOpen, conversationId],
    );
};

export default useConversation;
