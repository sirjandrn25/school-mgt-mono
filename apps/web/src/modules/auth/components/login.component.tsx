"use client";
import React, { useState } from "react";
import { Button, InputField } from "ui";
import ApiService from "../../../utils/api.service.utils";
import { DictionaryType } from "core";
import { EmptyFunction } from "ui/utils/common.utils";
import { AuthStorageUtils } from "../../../utils/storage.utils";
import { useAuthContext } from "../../../context/auth.context";
import { useRouter } from "next/navigation";

const Login = () => {
    const [data, setData] = useState<DictionaryType>();
    const { setIsLoggedIn } = useAuthContext();
    const router = useRouter();
    const handleLogin = async (next = EmptyFunction) => {
        const { success, response } = await ApiService.postRequest(
            "auth/login",
            data
        );
        if (success) {
            AuthStorageUtils.setInfo(response);
            setIsLoggedIn(true);
            return router.push("/dashboard");
        }

        next();
    };
    const handleChange = (key: string, value: string) => {
        setData((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    return (
        <div className="flex items-center justify-center flex-1 h-screen">
            <div className="flex flex-col shadow gap-4 p-4 border rounded w-[400px]">
                <InputField
                    label="Email"
                    placeholder="Enter email "
                    type="email"
                    value={data?.email}
                    onChange={(value) => handleChange("email", value)}
                />
                <InputField
                    label="Password"
                    placeholder="Enter password "
                    type="password"
                    value={data?.password}
                    onChange={(value) => handleChange("password", value)}
                />
                <Button onClick={handleLogin} progress appearance="neutral">
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;
