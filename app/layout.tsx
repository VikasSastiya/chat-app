import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import AuthContext from "@/components/context/AuthContext";
import ToasterContext from "@/components/context/ToasterContext";
import ActiveStatus from "@/components/ActiveStatus";
import LoadingBar from "./loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatApp",
    description: "ChatApp - The Ultimate Chat App",
    icons: {
        icon: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900058/Chat%20app%C2%A0/logo1_xfymts.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
                />
            </head>
            <body className={inter.className}>
                <LoadingBar />
                <Providers>
                    <AuthContext>
                        <ToasterContext />
                        <ActiveStatus />
                        {children}
                    </AuthContext>
                </Providers>
            </body>
        </html>
    );
}
