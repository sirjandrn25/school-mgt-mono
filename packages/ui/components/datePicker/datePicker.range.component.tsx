"use client";

import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import React from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useUpdateEffect } from "react-use";
import { Button } from "ui";

import "react-day-picker/dist/style.css";
import { Popover } from "../popover/popover";
import { cn } from "tailwind-config";
import { EmptyFunction } from "../../utils/common.utils";
interface DateRangePicker {
    value?: DateRange;
    defaultValue?: DateRange;
    className?: string;
    onChange?: (value: DateRange | undefined) => void;
}
export function DatePickerRange({
    className,
    value,
    defaultValue,
    onChange = EmptyFunction,
}: DateRangePicker) {
    const [date, setDate] = React.useState<DateRange | undefined>(
        defaultValue || value || undefined
    );
    useUpdateEffect(() => {
        setDate(value);
    }, [value]);

    const handleChange = (value: DateRange | undefined) => {
        setDate(value);
        onChange(value);
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover
                contentClassName="w-full"
                content={
                    <Button
                        outline
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(new Date(date.to), "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                }
            >
                <DayPicker
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleChange}
                    numberOfMonths={2}
                />
            </Popover>
        </div>
    );
}
