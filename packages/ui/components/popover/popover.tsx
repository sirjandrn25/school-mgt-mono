import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { EmptyFunction } from "../../utils/common.utils";
import { PopoverContent, PopoverCore, PopoverTrigger } from "./popover.root";

export const Popover = ({
    content,
    children,
    contentClassName = "",
    open: openProps = false,
    handleOpen = EmptyFunction,
}: any) => {
    const [open, setOpen] = useState(openProps);
    useUpdateEffect(() => setOpen(openProps), [openProps]);
    return (
        <PopoverCore
            open={open}
            onOpenChange={(open) => {
                setOpen(open);

                handleOpen(open);
            }}
        >
            <PopoverTrigger>{content}</PopoverTrigger>
            <PopoverContent className={contentClassName}>
                {children}
            </PopoverContent>
        </PopoverCore>
    );
};
