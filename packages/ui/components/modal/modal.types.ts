import { ReactNode } from "react";

export const modalSizes = {
    sm: "w-[450px]",
    md: "w-[650px]",
    lg: "w-[850px]",
    xl: "w-[1150px]",
    full: "w-full",
};
export interface ModalInterface {
    title?: string | any;
    children: ReactNode;
    description?: string;
    openTriggerComponent?: ReactNode;
    size?: keyof typeof modalSizes;
    className?: string;
    footer?: ReactNode;
    closeable?: boolean;
    closeIcon?: boolean;
    isVisible?: boolean;
}

export interface ModalWrapperInterface {
    component: (props: any) => React.ReactElement;
    headingTitle?: string;
    headingSubTitle?: string;
    props?: any;
    size?: number;
    openFrom?: "right" | "left" | "bottom";
}
