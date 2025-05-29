import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center gap-x-3">
                <span className="h-10 w-10 flex items-center justify-center">
                    <Image
                        src="/MessageHub-logo.png"
                        alt="MessageHub Logo"
                        width={150} // Adjust width as needed
                        height={50} // Adjust height as needed
                        priority // Add if this is an important above-the-fold image
                    />
                </span>
                <h1 className={cn("text-3xl font-semibold", font.className)}>
                    MessageHub
                </h1>
            </div>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
