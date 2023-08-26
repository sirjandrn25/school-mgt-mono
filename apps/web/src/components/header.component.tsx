import useLogout from "@hooks/useLogout.hook";
import { UserCircle } from "lucide-react";
import { InputField, dropDownMenuItem } from "ui";
import DropdownMenu from "ui/components/dropdown-menu/dropdown-menu.component";

const Header = () => {
    const { handleLogout } = useLogout();
    const items: dropDownMenuItem[] = [
        {
            name: "Settings",
            key: "settings",
        },
        {
            name: "Logout",
            key: "logout",
            action: handleLogout,
        },
    ];
    return (
        <div className="h-[60px] bg-base-100 px-4 flex justify-between items-center gap-4 border-b">
            <InputField type="text" placeholder="Search" />
            <div className="flex items-center gap-2 pr-4">
                <DropdownMenu
                    align="end"
                    trigger={<UserCircle />}
                    items={items}
                />
            </div>
        </div>
    );
};

export default Header;
