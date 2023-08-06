export const EmptyFunction = () => {};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
    return (...args: any) => {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

export const IsFunction = (value: any) => {
    if (!value) return false;
    return typeof value === "function";
};

export const IsUndefined = (value: any) => {
    return typeof value === "undefined";
};

export const IsUndefinedOrNull = (value: any) => {
    if (IsUndefined(value)) return true;
    return value === null;
};
