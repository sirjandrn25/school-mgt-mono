import useNavigation from "@hooks/useNavigation.hook";
import { ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import { cn } from "tailwind-config";

const dashboard_route = "/dashboard";
const routes = [
    {
        name: "Dashboard",
        route: dashboard_route,
    },
    {
        name: "Student",
        route: `${dashboard_route}/student`,
    },

    {
        name: "Courses",
        route: `${dashboard_route}/courses`,
    },
    {
        name: "Grades",
        route: `${dashboard_route}/grades`,
    },
];

const SideBar = ({ className }: any) => {
    return (
        <div className={cn(" border-r bg-base-100", className)}>
            <div className="p-3 flex items-center justify-center border-b h-[60px]">
                This is NavBar
            </div>
            {routes.map((route) => {
                return <SideBarItem key={route?.route} item={route} />;
            })}
        </div>
    );
};

const SideBarItem = ({ item }: any) => {
    const { pathname, navigation } = useNavigation();
    const isActiveRoute = useMemo(
        () => item?.route == pathname,
        [pathname, item]
    );
    return (
        <div
            key={item?.key}
            onClick={() => {
                navigation(item?.route);
            }}
            className={cn(
                "flex items-center justify-between p-3 border-b cursor-pointer hover:bg-base-200",
                {
                    "bg-base-300": isActiveRoute,
                }
            )}
        >
            <div className="">{item?.name}</div>
            <ChevronRight />
        </div>
    );
};

export default SideBar;
