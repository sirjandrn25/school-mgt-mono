export class FunctionUtils {
    static IsFunction = (value: any) => {
        if (!value) return false;
        return typeof value === "function";
    };
}
