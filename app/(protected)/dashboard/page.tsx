import { auth, signOut } from "@/auth";
import { TempButton } from "@/components/temporary-button";

const DashboardPage = async () => {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit">
                    Sign out
                </button>
            </form>
            <TempButton />
        </div>
    );
}

export default DashboardPage;