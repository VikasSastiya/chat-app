// import { auth } from "@/auth";
import EmptyState from "@/components/Empty-state";
import { Toaster } from "react-hot-toast";
// import { TempButton } from "@/components/temporary-button";

const DashboardPage = async () => {
    // const session = await auth();

    return (
        <>
            <Toaster />
            <div className="hidden lg:block lg:pl-80 h-full">
                {/* {JSON.stringify(session)} */}
                {/* <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <button type="submit">
                        Sign out
                    </button>
                </form> */}
                {/* <TempButton /> */}
                <EmptyState />
            </div>
        </>
    );
}

export default DashboardPage;