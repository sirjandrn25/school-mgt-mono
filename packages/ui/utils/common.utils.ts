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
