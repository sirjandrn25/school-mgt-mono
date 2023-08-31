"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../Styles/global.css";
import { AuthProvider } from "../src/context/auth.context";

const queryClient = new QueryClient();

const RootLayout = ({ children }: any) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <html lang="en">
                    <body>
                        <header className={"School Management"}></header>
                        <main>{children}</main>
                    </body>
                </html>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default RootLayout;
