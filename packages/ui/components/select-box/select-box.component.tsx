"use client";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValue,
} from "./select.core";
import { SelectBoxInterface } from "./select-box.types";
import Label from "../input/label.component";
import ErrorMessage from "../input/error.message.component";
import { useMemo, useState } from "react";
import { ArrayUtils } from "helper-utils";
import { EmptyFunction } from "../../utils/common.utils";
import { useUpdateEffect } from "react-use";
import "../../style.css";

export const SelectBox = ({
    value: valueProps = "",
    placeholder,
    label,
    onChange = EmptyFunction,
    defaultValue = "",
    options = [],
    required,
    error = "",
    valueClassName = "",
    isClearable,
}: SelectBoxInterface) => {
    const [value, setValue] = useState<string>(defaultValue);

    useUpdateEffect(() => {
        setValue(valueProps);
    }, [valueProps]);
    const handleChange = (data: string) => {
        const option = ArrayUtils.getObject(options, "value", data);
        setValue(data);
        onChange(option);
    };
    const isClearableProp = useMemo(() => {
        if (!isClearable) return false;
        console.log(value);
        return !!value;
    }, []);
    return (
        <div className="form-control">
            <Label {...{ label, required, error }} />
            <SelectRoot
                onValueChange={(value) => {
                    handleChange(value);
                }}
                value={value}
                defaultValue={defaultValue}
            >
                <SelectTrigger
                    is_clearable={isClearableProp}
                    className={valueClassName}
                >
                    <SelectValue
                        defaultValue={String(defaultValue ?? value)}
                        placeholder={placeholder}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options?.map((option) => {
                            return (
                                <SelectItem
                                    key={option?.value}
                                    value={String(option?.value)}
                                >
                                    {option?.label}{" "}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </SelectRoot>
            <ErrorMessage {...{ error }} />
        </div>
    );
};
