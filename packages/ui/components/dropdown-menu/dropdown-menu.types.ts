import { ReactNode } from "react";

export type dropDownMenuItem = {
    name: string;
    key: string;
    action?: () => void;
};

export interface DropdownMenuInterface {
    trigger: ReactNode | string;
    items: dropDownMenuItem[];
    label?: string | ReactNode;
    side?: "bottom" | "top" | "right";
    align?: "center" | "start" | "end";
    alignOffset?: number;
}
