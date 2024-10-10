import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-purple-800">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className,
        )}>
          🗨️chat-app
        </h1>
        <p className="text-white text-lg">
          A simple Authentication System
        </p>
        <div>
          <LoginButton> 
            <Button variant="secondary" size="lg">
              sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
