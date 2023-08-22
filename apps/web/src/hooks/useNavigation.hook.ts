import { usePathname, useRouter } from "next/navigation";

const useNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigation = (path: string) => {
        router.push(path);
    };

    return {
        navigation,
        pathname,
    };
};

export default useNavigation;
