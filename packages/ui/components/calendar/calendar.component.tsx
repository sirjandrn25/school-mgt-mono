"use client";

import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useUpdateEffect } from "react-use";
export function Calendar({
    onChange,
    minDate,
    maxDate,
    value,
    mode = "single",
}: any) {
    const [selected, setSelected] = useState<any>(value || new Date());

    useUpdateEffect(() => {
        onChange(selected);
    }, [selected]);
    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, "PP")}.</p>;
    }

    const minMaxDate = useMemo(() => {
        let props: any = {};
        if (minDate) {
            props.disabledDays.before = new Date(minDate);
        }
        if (maxDate) {
            props = {
                ...props,
                disabledDays: {
                    from: new Date(),
                },
            };
        }
        return props;
    }, [maxDate, minDate]);

    return (
        <DayPicker
            mode={mode}
            selected={selected}
            onSelect={setSelected}
            footer={footer}
            className="w-full"
        />
    );
}
