import { AuthStorageUtils } from "@utils/storage.utils";
import { useCallback, useEffect, useState } from "react";
import useNavigation from "./useNavigation.hook";

const useLogout = () => {
    const { navigation } = useNavigation();
    const [data, setData] = useState(1);

    const handleLogout = useCallback(() => {
        AuthStorageUtils.logout();
        navigation("/login");
    }, []);
    return {
        handleLogout,
    };
};

export default useLogout;
