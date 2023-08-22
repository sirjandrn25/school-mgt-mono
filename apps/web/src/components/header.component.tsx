import { UserCircle } from "lucide-react";
import React from "react";
import { InputField } from "ui";

const Header = () => {
    return (
        <div className="h-[60px] bg-base-100 px-4 flex justify-between items-center gap-4 border-b">
            <InputField type="text" placeholder="Search" />
            <div className="flex items-center gap-2 pr-4">
                <UserCircle className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Header;
