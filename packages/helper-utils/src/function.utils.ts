import { CoreUtils } from "./core.utils";

export class FunctionUtils extends CoreUtils {
    static IsFunction = (value: any) => {
        if (!value) return false;
        return typeof value === "function";
    };
}
