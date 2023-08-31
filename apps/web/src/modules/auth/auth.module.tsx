"use client";
import React, { useState } from "react";
import { Button, InputField } from "ui";

const AuthModule = () => {
    const [data, setData] = useState<any>({});
    const handleChange = (key: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await fetch("/api/login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await result.json();
    };
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div
                // onClick={onSubmit}
                className="flex flex-col gap-4 p-4 rounded shadow w-[500px]"
            >
                <InputField
                    label="Email"
                    value={data?.email}
                    onChange={(value) => handleChange("email", value)}
                    type="email"
                />
                <InputField
                    label="Password"
                    value={data?.password}
                    onChange={(value) => handleChange("password", value)}
                    type="password"
                />
                <Button onClick={(_, e) => onSubmit(e)}>Login</Button>
            </div>
        </div>
    );
};

export default AuthModule;
