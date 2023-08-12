/**
 * @author Sirjan Tamang
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "tailwind-config";

import {
    EmptyFunction,
    IsFunction,
    IsUndefined,
} from "../../utils/common.utils";
import {
    CheckBoxInterface,
    CheckboxSizes,
    CheckboxAppearance,
} from "./checkbox.types";

/**
 * Represents a CheckBox component.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.leftLabel - The label displayed to the left of the checkbox.
 * @param {boolean} props.checked - The current checked state of the checkbox.
 * @param {boolean} props.defaultChecked - The default checked state of the checkbox.
 * @param {Function} props.onChange - The callback function called when the checkbox is changed.
 * @param {boolean} props.disabled - Specifies if the checkbox is disabled.
 * @param {string} props.size - The size of the checkbox. Can be 'sm', 'md', or 'lg'.
 * @param {string} props.rightLabel - The label displayed to the right of the checkbox.
 * @param {string} props.appearance - The appearance style of the checkbox. Can be 'primary', 'secondary', etc.
 *
 * @returns {JSX.Element} The rendered CheckBox component.
 */
export const CheckBox = ({
    leftLabel,
    checked: checkedProps,
    defaultChecked,

    disabled,
    onChange = EmptyFunction,
    size = "sm",
    rightLabel,
    appearance = "primary",
    subLabel,
}: CheckBoxInterface) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked || false);

    useEffect(() => {
        if (IsUndefined(checkedProps)) return;
        setChecked(!!checkedProps);
    }, [checkedProps]);

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;

        IsFunction(onChange) && onChange(isChecked);

        setChecked(isChecked);
    };
    const renderLabel = useCallback(
        (label: any) => {
            if (!label) return <></>;
            if (!subLabel) return <div className="label-text">{label}</div>;
            return (
                <div className="label-text">
                    <div className="col-flex">
                        <div className="">{label}</div>
                        <div className="text-xs text-base-tertiary">
                            {subLabel}
                        </div>
                    </div>
                </div>
            );
        },
        [subLabel]
    );
    return (
        <div className="form-control">
            <label
                className={cn("gap-2 cursor-pointer row-flex justify-start", {
                    label: leftLabel || rightLabel, // if there is label then only it will take label class
                })}
            >
                {renderLabel(leftLabel)}

                <input
                    type="checkbox"
                    checked={checked}
                    className={cn(
                        `checkbox ${CheckboxSizes[size]} ${CheckboxAppearance[appearance]}`
                    )}
                    onChange={handleChecked}
                    {...{
                        disabled,
                    }}
                />
                {renderLabel(rightLabel)}
            </label>
        </div>
    );
};
