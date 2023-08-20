"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { useEffectOnce } from "react-use";
import ApiService from "../utils/api.service.utils";
import { AuthStorageUtils } from "../utils/storage.utils";

type userType = {
    name: string;
    email: string;
    role: "USER" | "ADMIN";
};
type AuthContextType = {
    user?: userType;
    isLoggedIn: boolean;
};
export const AuthContext = createContext<AuthContextType>({
    user: {
        name: "",
        email: "",
        role: "ADMIN",
    },
    isLoggedIn: true,
});

let timer: any;
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<userType>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    useEffectOnce(() => {
        const interval = 3 * 60 * 1000; // 3 minutes
        handleRefreshToken();
        timer = setInterval(handleRefreshToken, interval);
        return () => clearTimeout(timer);
    });

    const handleRefreshToken = async () => {
        const refresh_token = AuthStorageUtils.getRefreshToken();
        const { success, response } = await ApiService.postRequest(
            "auth/refresh_token",
            {
                token: refresh_token,
            }
        );
        if (!success) {
            setIsLoggedIn(false);
            setLoggedUser(undefined);
            clearTimeout(timer);
            return AuthStorageUtils.logout();
        }
        AuthStorageUtils.setInfo(response);
    };

    return (
        <AuthContext.Provider value={{ user: loggedUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
