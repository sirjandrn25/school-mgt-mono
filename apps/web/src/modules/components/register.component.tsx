"use client";
import { DictionaryType } from "core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, InputField } from "ui";
import { EmptyFunction } from "ui/utils/common.utils";
import ApiService from "../../utils/api.service.utils";

const Register = () => {
    const [data, setData] = useState<DictionaryType>();

    const router = useRouter();
    const handleRegister = async (next = EmptyFunction) => {
        const { success, response } = await ApiService.postRequest(
            "auth/register",
            data
        );
        if (success) {
            return router.push("/login");
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
                    label="Full name"
                    placeholder="Enter full name "
                    type="text"
                    value={data?.name}
                    onChange={(value) => handleChange("name", value)}
                />
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
                <Button onClick={handleRegister} progress appearance="neutral">
                    Create An Account
                </Button>
            </div>
        </div>
    );
};

export default Register;
