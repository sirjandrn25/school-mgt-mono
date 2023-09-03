"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const getQueryParam = (key: string) => (searchParams as any).get(key);
    const handleSearch = (key: string, value: string) => {
        router.push(`${pathname}?${key}=${value}`);
    };
    const navigation = (path: string) => {
        router.push(path);
    };

    return {
        getQueryParam,
        handleSearch,
        navigation,
        pathname,
    };
};
