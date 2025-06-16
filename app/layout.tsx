import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import AuthContext from "@/components/context/AuthContext";
import ToasterContext from "@/components/context/ToasterContext";
import ActiveStatus from "@/components/ActiveStatus";
import LoadingBar from "./loader";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MessageHub",
    description: "MessageHub - The Ultimate Chat App",
    icons: {
        // icon: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900058/Chat%20app%C2%A0/logo1_xfymts.png",
        icon: "/MessageHub-logo.png",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"  
                    enableSystem={true}
                    disableTransitionOnChange
                >
                    <LoadingBar />
                    <Providers>
                        <AuthContext>
                            <ToasterContext />
                            <ActiveStatus />
                            {children}
                        </AuthContext>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
