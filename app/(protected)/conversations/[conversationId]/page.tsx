import getConversationById from "@/hooks/conversations/getConversationById";
import getMessages from "@/hooks/messages/getMessages";
import EmptyState from "@/components/Empty-state";
import Header from "@/components/conversations/Header";
import Body from "@/components/conversations/Body";
import Form from "@/components/conversations/Form";

interface IParams {
    conversationId: string
}

const conversationId = async ({ params } : { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);
    console.log(messages);
    if (!conversation) {
        return (
            <div className={"lg:pl-80 h-full"}>
                <div className={"h-full flex flex-col"}>
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className={"lg:pl-80 h-full"}>
            <div className={"h-full flex flex-col"}>
                <Header conversation={conversation}/>
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}

export default conversationId