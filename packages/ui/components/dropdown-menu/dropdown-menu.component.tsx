"use client";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";
import { EmptyFunction } from "../../utils/common.utils";
import { DropdownMenuRoot, DropdownMenuTrigger } from "./dropdown-menu.core";
import { DropdownMenuInterface } from "./dropdown-menu.types";

const DropdownMenu = ({
    trigger,
    items = [],
    label,
    align,
    side,
    alignOffset,
}: DropdownMenuInterface) => {
    const renderLabel = useCallback(() => {
        if (!!label)
            return (
                <>
                    <DropdownMenuLabel>{label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </>
            );
        return null;
    }, [label]);
    return (
        <DropdownMenuRoot>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>

            <DropdownMenuContent
                {...{ align, side, alignOffset }}
                className="min-w-[100px] py-4 shadow rounded bg-base-100"
            >
                {renderLabel()}
                {items.map((item) => {
                    return (
                        <DropdownMenuItem
                            onClick={item?.action || EmptyFunction}
                            key={item?.key}
                            className="w-full px-8 py-1 text-left cursor-pointer hover:border-white hover:bg-base-200"
                        >
                            {item?.name}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenuRoot>
    );
};

export default DropdownMenu;
