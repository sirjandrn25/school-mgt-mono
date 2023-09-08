"use client";
import { useMemo, useState } from "react";
import { useUpdateEffect } from "react-use";
import { cn } from "tailwind-config";
import { Debounce } from "../../utils/common.utils";
import ErrorMessage from "./error.message.component";
import { InputInterface } from "./input.types";
import Label from "./label.component";
import "../../style.css";

export type InputFieldType = InputInterface & {
    type?: "text" | "number" | "email" | "password";
};

export const InputField = ({
    onBlur,
    onChange,
    label = "",
    value: valueProps = "",
    defaultValue = "",

    type = "text",
    placeholder = "",

    error,

    inputClassName = "",
    required = false,
    disabled = false,
    prefix,
    suffix,
    onDebounceChange,
    className = "",
    messageComponent,
    ...rest
}: InputFieldType) => {
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
    const handleBlur = (e: any) => {
        const input_val: any = e.target.value;
        if (onBlur) {
            onBlur(input_val);
        }
    };

    const inputClass = useMemo(() => {
        return cn(
            "focus:border-2",
            {
                error: "input-error",
                "focus:border-info ": !error,
            },
            inputClassName
        );
    }, [error, inputClassName]);
    return (
        <div className={`form-control  ${className}`}>
            {label && <Label {...{ error, required, label }} />}

            <InputComponent
                handleChange={handleChange}
                error={error}
                value={value}
                placeholder={placeholder}
                handleBlur={handleBlur}
                inputClassName={inputClass}
                type={type}
                disabled={disabled}
                prefix={prefix}
                suffix={suffix}
                {...rest}
            />
            {!error && messageComponent}
            {!!error && <ErrorMessage {...{ error }} />}
        </div>
    );
};

const InputComponent = ({
    type,
    placeholder,
    inputValue,
    handleChange,
    inputClassName,
    disabled,
    handleBlur,
    prefix,
    suffix,
    error,
    ...rest
}: any) => {
    return (
        <div className="relative flex items-center">
            <input
                value={inputValue}
                type={type}
                placeholder={placeholder}
                className={cn(
                    `input px-3  focus:outline-none h-10 text-sm   input-bordered   w-full`,
                    prefix && "pl-8",
                    suffix && "pr-8",
                    !!error && "input-error",
                    inputClassName
                )}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                {...rest}
            />
            {prefix && <span className="absolute left-2">{prefix}</span>}
            {suffix && <span className="absolute right-2">{suffix}</span>}
        </div>
    );
};
