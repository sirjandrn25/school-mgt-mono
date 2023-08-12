"use client";
import { User2, UserCircle2 } from "lucide-react";
import React from "react";
import { Button, InputField, SelectBox, TextareaInput } from "ui";

const Home = () => {
    return (
        <div className="flex flex-col gap-4 p-10">
            <InputField
                prefix={<User2 size={18} />}
                label="Username"
                placeholder="Enter User Name"
                suffix={<UserCircle2 />}
            />
            <TextareaInput
                label="Description"
                placeholder="Enter Description"
            />
            <SelectBox
                label="Select Option"
                isClearable
                options={[
                    {
                        label: "First Option",
                        value: "first-option",
                    },
                    {
                        label: "Second Option",
                        value: "second-option",
                    },
                    {
                        label: "Third Option",
                        value: "third-option",
                    },
                ]}
            />
            <Button
                onClick={(next) => {
                    console.log("cursor");
                }}
                loading
                defaultWidth
            >
                This
            </Button>{" "}
            <div className="text-blue-500">Text hero</div>
        </div>
    );
};

export default Home;
