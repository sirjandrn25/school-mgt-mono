import { forwardRef, useImperativeHandle, useState } from "react";
import { useWindowSize } from "react-use";
import { Dialog, DialogContent, DialogTrigger } from "./modal.core";
import { ModalInterface, modalSizes } from "./modal.types";

const Modal = forwardRef(({ children, ...props }: ModalInterface, ref) => {
    const [open, setOpen] = useState<boolean>(props?.isVisible || false);

    const { width } = useWindowSize();

    const {
        closeIcon = true,
        closeable = true,
        openTriggerComponent,
        size = "md",
        className,
    } = props || {};

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(closeable ? false : true);

    useImperativeHandle(ref, () => ({
        handleClose,
        handleOpen,
    }));
    const handleOpenChange = (open: boolean) => {
        if (!closeable && !open) return;
        setOpen(open);
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {!!openTriggerComponent && (
                <DialogTrigger asChild>{openTriggerComponent}</DialogTrigger>
            )}
            <DialogContent
                closeable={closeable}
                closeIcon={closeIcon}
                className={`${modalSizes[size]} ${className} ${
                    width <= 768 && "bottom-0  w-full" // for mobile view devices
                }`}
            >
                {children}
            </DialogContent>
        </Dialog>
    );
});
Modal.displayName = "Modal";

export default Modal;
