import React from "react";

const RootLayout = ({ children }: any) => {
    return (
        <html lang="en">
            <header className={"School Management"}></header>
            <main>{children}</main>
        </html>
    );
};

export default RootLayout;
