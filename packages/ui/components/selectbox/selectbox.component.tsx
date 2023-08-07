import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValue,
} from "./select.core";
import { SelectBoxInterface } from "./selectbox.types";

export const SelectBox = ({
    value: valueProps,
    placeholder,
    label,
    onChange,
    defaultValue,
    options,
}: SelectBoxInterface) => {
    return (
        <SelectRoot
            onValueChange={(e) => {
                console.log(e);
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    defaultValue={String(defaultValue || valueProps)}
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
    );
};
