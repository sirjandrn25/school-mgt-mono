"use client";
import React from "react";
import { Button } from "ui";

const Home = () => {
    return (
        <div className="p-10">
            <Button
                onClick={() => {
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
