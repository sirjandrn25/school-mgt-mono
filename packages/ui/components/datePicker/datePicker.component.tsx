import { useState } from "react";

import { Button } from "../button";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Popover } from "../popover/popover";
import { cn } from "tailwind-config";
import { Calendar } from "../calendar/calendar.component";

const DatePicker = ({ onChange, value, minDate, maxDate, className }: any) => {
    const [date, setDate] = useState<Date>(value);
    return (
        <Popover
            contentClassName="w-full"
            content={
                <Button
                    outline
                    className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
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

export default DatePicker;
