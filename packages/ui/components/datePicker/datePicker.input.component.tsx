import { useState } from "react";

import { Button } from "../button";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Popover } from "../popover/popover";
import { cn } from "tailwind-config";
import { Calendar } from "../calendar/calendar.component";
import { InputField } from "../input";

export const DatePickerInput = ({
    onChange,
    value,
    minDate,
    maxDate,
    className,
    ...rest
}: any) => {
    const [date, setDate] = useState<Date>(value);
    return (
        <Popover
            contentClassName="w-full"
            content={
                <InputField
                    {...rest}
                    suffix={<CalendarIcon className="w-4 h-4 mr-2" />}
                    className={cn(
                        "min-w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                    value={date ? format(date, "PPP") : undefined}
                />
            }
        >
            <Calendar
                {...{ minDate, maxDate, value: date }}
                onChange={(value: any) => {
                    setDate(value);
                    onChange(value);
                }}
            />
        </Popover>
    );
};
