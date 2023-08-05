"use client";
import { useMemo, useState } from "react";
import { cn } from "tailwind-config";
import { EmptyFunction } from "../../utils/common.utils";
import {
    buttonAppearance,
    buttonProps,
    buttonShape,
    buttonSizes,
} from "./button.types";
import { useUpdateEffect } from "react-use";

export const Button = ({
    onClick = EmptyFunction,

    shape,
    children,
    defaultWidth,
    loading: loadingProps,
    size = "md",
    appearance = "primary",
    fullWidth = false,
    className = "",
    progress = false,
    outline = false,
    disabled = false,
}: // glass = true,
buttonProps) => {
    const [loading, setLoading] = useState<any>(false);

    useUpdateEffect(() => {
        setLoading(loadingProps);
    }, [loadingProps]);

    const next = () => setLoading(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) return;

        progress && setLoading(true);
        onClick(next, e);
    };
    const mapBtnShape = useMemo(() => {
        switch (shape) {
            case "square":
                return buttonShape["square"];
            case "circle":
                return buttonShape["circle"];
            default:
                return;
        }
    }, [shape]);
    return (
        <button
            disabled={disabled}
            className={cn(
                "btn",
                buttonAppearance[appearance],
                mapBtnShape,
                buttonSizes[size],
                "normal-case",

                {
                    "w-full": fullWidth,
                    "btn-outline": outline,
                    "min-w-[150px]": defaultWidth,
                    "cursor-wait": loading,
                },
                className
            )}
            onClick={handleClick}
        >
            {loading && <span className="loading loading-spinner"></span>}
            {children}
        </button>
    );
};
