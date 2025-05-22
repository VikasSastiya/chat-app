"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <Provider store={store}>
                <SessionProvider>{children}</SessionProvider>
            </Provider>
        </ThemeProvider>
    );
};
