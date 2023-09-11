import { format, isDate, parse } from "date-fns";
import {
    API_DATE_FORMAT,
    DISPLAY_DATE_FORMAT,
    DISPLAY_DATE_TIME_FORMAT,
} from "./dateFormat.constant";
export const formatDisplayDate = (date: Date, isTimeShow?: boolean) => {
    const dateValue = GetDateValue(date);
    if (!dateValue) return;
    return format(
        GetDateValue(date),
        isTimeShow ? DISPLAY_DATE_TIME_FORMAT : DISPLAY_DATE_FORMAT
    );
};
export const ApiDateFormat = (date: any, dateFormat: any = API_DATE_FORMAT) => {
    if (!date) return date;
    const dateData = GetDateValue(date);
    return format(dateData, dateFormat);
};
export const GetDateValue = (date: any, format?: string) => {
    if (!date || isDate(date)) return date;
    if (format) {
        return parse(date, format, new Date());
    }
    return new Date(date);
};
