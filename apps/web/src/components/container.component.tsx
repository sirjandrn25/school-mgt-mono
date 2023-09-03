import React from "react";
import { cn } from "tailwind-config";

const Container = ({ children, className }: any) => {
    return (
        <div className={cn("p-4 md:p-10 flex flex-col", className)}>
            {children}
        </div>
    );
};

export default Container;
