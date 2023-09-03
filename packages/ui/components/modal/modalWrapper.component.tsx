import React, { useCallback, useImperativeHandle, useState } from "react";
import Modal from "./modal.component";
import { ModalWrapperInterface } from "./modal.types";

export const ModalWrapper = React.forwardRef((props, ref) => {
    const [modals, setModals] = useState<any>([]);

    const close = useCallback(
        (close_index: number = modals.length - 1) => {
            setTimeout(() => {
                const modal_list = [...modals];
                modal_list.splice(close_index, 1);
                setModals(modal_list);
            }, 400);

            const currentModal = modals[close_index];
            if (currentModal) currentModal.isVisible = false;

            setModals((prev: any) => {
                return (prev || []).map((modal: any, index: number) =>
                    close_index === index ? currentModal : modal
                );
            });
        },
        [modals]
    );
    const closeAll = () => {
        setModals((prev: any) => {
            return (prev || []).map((modal: any) => (modal.isVisible = false));
        });
        setTimeout(() => {
            setModals([]);
        }, 300);
    };
    const updateProps = (update_props: any) => {
        setModals((prev: any) => {
            const update_index = (prev || []).length - 1;
            return (prev || []).map((modal: any, index: number) => {
                if (index === update_index) {
                    return {
                        ...modal,
                        ...update_props,
                    };
                }
                return modal;
            });
        });
    };

    const open = ({
        component,
        props = {},
        ...rest
    }: ModalWrapperInterface) => {
        const sheet = {
            props,
            component,
            isVisible: true,
            ...rest,
        };

        setModals((prev: any = []) => {
            return [...prev, sheet];
        });
    };
    useImperativeHandle(
        ref,
        () => {
            return {
                close,
                open,
                closeAll,
                updateProps,
            };
        },
        [close]
    );

    const EmptyComponent = () => {
        return <></>;
    };

    const renderModals = () => {
        return (modals || []).map((sheet: any, index: number) => {
            const Component = sheet?.component || EmptyComponent;
            const props = sheet.props;

            return (
                <Modal closeModal={close} {...sheet} key={index}>
                    <Component {...props} />
                </Modal>
            );
        });
    };

    return renderModals();
});

ModalWrapper.displayName = "ModalWrapper";
