import React from "react";
import "../Styles/global.css";

const RootLayout = ({ children }: any) => {
    return (
        <html lang="en">
            <body>
                <header className={"School Management"}></header>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
