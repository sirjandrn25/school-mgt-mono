import { ReactNode } from "react";

export const CheckboxSizes = {
    xs: "checkbox-xs",
    sm: "checkbox-sm",
    md: "checkbox-md",
    lg: "checkbox-lg",
};
export const CheckboxAppearance = {
    primary: "checkbox-primary",
    accent: "checkbox-accent",
    success: "checkbox-success",
    warning: "checkbox-warning",
    info: "checkbox-info",
    error: "checkbox-error",
};
export interface CheckBoxInterface {
    leftLabel?: string;
    rightLabel?: string | ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (data?: any) => void;
    disabled?: boolean;
    key?: string;
    size?: keyof typeof CheckboxSizes;
    appearance?: keyof typeof CheckboxAppearance;
    subLabel?: string;
}
