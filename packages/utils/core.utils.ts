export class CoreUtils {
    static IsUndefined = (value: any) => {
        return typeof value === "undefined";
    };

    static IsUndefinedOrNull = (value: any) => {
        if (CoreUtils.IsUndefined(value)) return true;
        return value === null;
    };
}
