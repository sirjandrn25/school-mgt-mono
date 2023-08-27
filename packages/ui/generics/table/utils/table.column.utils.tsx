import { DictionaryType } from "core";
import { TableColumnInterface } from "../table.types";
import { FunctionUtils, ObjectUtils } from "helper-utils";

export default class TableColumnUtils {
    static parseColumn(column: TableColumnInterface, data: DictionaryType) {
        if (FunctionUtils.IsFunction(column.renderValue)) {
            return (column as any)?.renderValue(data);
        }
        const value = ObjectUtils.accessNestedValue(data, column.key);
        switch (column.type) {
            case "date":
                return value; // format date value
            case "currency":
                return value; // format currency value

            default:
                return value;
        }
    }
}
