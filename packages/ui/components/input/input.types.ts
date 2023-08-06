import { ReactNode } from "react";

export interface LabelInterface {
    error?: string;
    label?: string;
    required?: boolean;
}
export interface InputInterface extends LabelInterface {
    size?: "xs" | "sm" | "md" | "lg";
    value?: any;
    onChange?: (value: any) => void;

    errorMessage?: string;
    onBlur?: (value: any) => any;
    inputClassName?: string;
    placeholder?: string;

    disabled?: boolean;
    prefix?: any;
    suffix?: any;
    autoComplete?: boolean;
    autoFocus?: boolean;
    onDebounceChange?: (value: any) => void;
    className?: string;
    defaultValue?: string;
    messageComponent?: ReactNode;
}

export interface TextareaInputInterface
    extends Omit<
        InputInterface,
        "prefix" | "suffix" | "autoComplete" | "type" | "size"
    > {
    rows?: number;
    cols?: number;
}
