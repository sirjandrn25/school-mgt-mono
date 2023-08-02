"use client";
import { useState } from "react";
import { cn } from "tailwind-config";
import { EmptyFunction } from "../../utils/common.utils";
import {
    buttonAppearance,
    buttonProps,
    buttonShape,
    buttonSizes,
} from "./button.types";

const Button = ({
    onClick = EmptyFunction,
    size = "md",
    appearance = "primary",
    fullWidth = false,
    className = "",
    progress = false,
    outline = false,
    disabled = false,
    shape = "square",
    children,
    glass = true,
}: buttonProps) => {
    const [loading, setLoading] = useState<any>(false);

    const next = () => setLoading(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) return;

        progress && setLoading(true);
        onClick(next, e);
    };
    console.log(buttonSizes[size]);
    return (
        <button
            disabled={disabled}
            className={cn(
                "btn",
                buttonAppearance[appearance],
                buttonShape[shape],
                buttonSizes[size],
                "normal-case",

                {
                    loading: loading,
                    "w-full": fullWidth,
                    "btn-outline": outline,
                    glass: glass,
                },
                className
            )}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;
