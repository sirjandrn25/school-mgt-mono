import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { cn } from "tailwind-config";
import { Debounce } from "../../utils/common.utils";
import ErrorMessage from "./error.message.component";
import { TextareaInputInterface } from "./input.types";
import Label from "./label.component";
import "../../style.css";

export const TextareaInput = ({
    onBlur,
    onChange,
    label = "",
    value: valueProps,
    defaultValue = "",
    placeholder = "",

    error,

    inputClassName = "",
    required = false,
    disabled = false,

    onDebounceChange,
    className = "",
    messageComponent,

    ...rest
}: TextareaInputInterface) => {
    const [value, setValue] = useState<any>(defaultValue || "");

    useUpdateEffect(() => {
        setValue(valueProps);
    }, [valueProps]);

    const handleChange = (e: any) => {
        const input_val: any = e.target.value;
        setValue(input_val);
        if (onChange) {
            onChange(input_val);
        }
        if (onDebounceChange) {
            Debounce(onDebounceChange, 300)(input_val);
        }
    };
    return (
        <div className={`form-control  ${className}`}>
            {label && <Label {...{ error, required, label }} />}
            <textarea
                placeholder={placeholder}
                onChange={handleChange}
                {...rest}
                disabled={!!disabled}
                className={cn(
                    `textarea px-3 textarea-bordered focus:border-2 focus:outline-none focus:border-info  `,
                    inputClassName
                )}
                value={value}
            ></textarea>
            {!error && messageComponent}
            {error && <ErrorMessage {...{ error }} />}
        </div>
    );
};
