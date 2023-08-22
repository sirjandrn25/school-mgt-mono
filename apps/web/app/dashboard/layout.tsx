"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";
import { Loading } from "ui";
import { useAuthContext } from "../../src/context/auth.context";
import DashboardWrapper from "@components/dashboardWrapper.component";

const Layout = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn, isLoading } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = useMemo(() => !pathname.includes("/dashboard"), []);
    useEffect(() => {
        if (isLoading) return;
        if (!isPublicRoute && !isLoggedIn) return router.push("/login");
    }, [isLoading, isLoggedIn, isPublicRoute]);

    if (isLoading)
        return (
            <div className="z-50 flex items-center justify-center w-screen h-screen bg-white">
                <Loading />
            </div>
        );
    if (pathname.includes("/dashboard") && !isLoggedIn && !isLoading) {
        return <></>;
    }
    return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default Layout;
