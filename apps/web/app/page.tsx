"use client";
import React from "react";
import { Button, InputField } from "ui";

const Home = () => {
    return (
        <div className="p-10">
            <InputField label="Username" placeholder="Enter User Name" />
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
