import { ObjectUtils } from "./object.utils";

export class ArrayUtils {
    static getObject(arr: Object[], key: string, value: string | number) {
        if (!ArrayUtils.isArray(arr)) return;
        for (let el of arr) {
            if (ObjectUtils.accessNestedValue(el, key) === value) {
                return el;
            }
        }
    }

    static isArray(el: any) {
        return Array.isArray(el);
    }
    static isUniqueObject = (array: any[], key: string) => {
        if (!ArrayUtils.isArray(array)) return false;
        return ArrayUtils.isUnique(array.map((element) => element[key]));
    };

    static isUnique = (array: (string | number)[]) => {
        const exist_elements: any[] = [];
        for (let arr of array) {
            if (!exist_elements.includes(arr)) exist_elements.push(arr);
        }
        return exist_elements?.length === array?.length;
    };
}
