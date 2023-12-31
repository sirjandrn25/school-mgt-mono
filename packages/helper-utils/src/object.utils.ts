import { ArrayUtils } from "./array.utils";
import { CoreUtils } from "./core.utils";
import { DictionaryType } from "core";

export class ObjectUtils extends CoreUtils {
    static isEmpty(obj: any) {
        if (typeof obj === "object") {
            return !!Object.values(obj).length;
        }
        return false;
    }

    static isObject(obj: any) {
        return typeof obj === "object" && !ArrayUtils.isArray(obj);
    }

    static accessNestedValue = (obj: any, key: string) => {
        if (!ObjectUtils.isObject(obj)) return;
        const keys = key.split(".");

        const lastKey = keys.pop();
        if (!lastKey) return null;
        if (!keys?.length) return obj[lastKey];
        let pointer = keys.reduce((acc: any, key: string) => {
            const value = acc[key];

            if (CoreUtils.IsUndefinedOrNull(value)) {
                return {};
            }
            return value;
        }, obj);

        return pointer[lastKey];
    };

    static removeNode(Obj: DictionaryType, key: string) {
        const newData = { ...Obj };
        delete newData[key];
        return newData;
    }
}
