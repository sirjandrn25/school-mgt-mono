"use client";
import "../Styles/global.css";
import { AuthProvider } from "../src/context/auth.context";

const RootLayout = ({ children }: any) => {
    return (
        <AuthProvider>
            <html lang="en">
                <body>
                    <header className={"School Management"}></header>
                    <main>{children}</main>
                </body>
            </html>
        </AuthProvider>
    );
};

export default RootLayout;
