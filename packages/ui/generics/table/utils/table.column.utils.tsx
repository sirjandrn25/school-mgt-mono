import { DictionaryType } from "core";
import { TableColumnInterface } from "../table.types";
import { FunctionUtils, ObjectUtils } from "helper-utils";
import { EmptyFunction } from "../../../utils/common.utils";
import { formatDisplayDate } from "../../../components";

export default class TableColumnUtils {
    static parseToUrl = (item: any, column: any) => {
        if (FunctionUtils.IsFunction(column.url)) return column.url(item);
        return column?.url;
    };
    static parseColumn(
        column: TableColumnInterface,
        data: DictionaryType,
        navigation: (url: string) => void = EmptyFunction
    ) {
        if (FunctionUtils.IsFunction(column.renderValue)) {
            return (column as any)?.renderValue(data);
        }

        const value = ObjectUtils.accessNestedValue(data, column.key);

        if (column?.url) {
            return (
                <div
                    onClick={() => {
                        navigation(TableColumnUtils.parseToUrl(data, column));
                    }}
                    className="cursor-pointer text-info hover:underline"
                >
                    {value}
                </div>
            );
        }

        switch (column.type) {
            case "date":
                return formatDisplayDate(value); // format date value
            case "currency":
                return value; // format currency value

            default:
                return value;
        }
    }
}
