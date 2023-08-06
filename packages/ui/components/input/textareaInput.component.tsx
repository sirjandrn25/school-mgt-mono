import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { cn } from "tailwind-config";
import { Debounce } from "../../utils/common.utils";
import ErrorMessage from "./error.message.component";
import { TextareaInputInterface } from "./input.types";
import Label from "./label.component";

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
        <div className={`flex flex-col gap-1  ${className}`}>
            {label && <Label {...{ error, required, label }} />}
            <textarea
                placeholder={placeholder}
                onChange={handleChange}
                {...rest}
                disabled={!!disabled}
                className={cn(
                    `textarea px-3 textarea-bordered  `,
                    inputClassName
                )}
            >
                {value}
            </textarea>
            {!error && messageComponent}
            {error && <ErrorMessage {...{ error }} />}
        </div>
    );
};
