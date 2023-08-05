export const buttonAppearance = {
    primary: " btn-primary",
    secondary: " btn-secondary",
    accent: " btn-accent",
    info: " btn-info",
    warning: " btn-warning",
    error: " btn-error",
    ghost: " btn-ghost",
    success: " btn-success",
    neutral: " btn-neutral",
};

export const buttonSizes = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md ",
    lg: "btn-lg",
};

export const buttonShape = {
    square: "btn-square",
    circle: "btn-circle",
};

type appearanceType = keyof typeof buttonAppearance;

export type buttonProps = {
    onClick?: (
        next?: () => void,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => void;
    size?: keyof typeof buttonSizes;
    appearance?: appearanceType;
    fullWidth?: boolean;
    ripple?: boolean;
    className?: string;
    progress?: boolean;
    outline?: boolean;
    disabled?: boolean;
    shape?: keyof typeof buttonShape;
    children: any;
    glass?: boolean;
    defaultWidth?: boolean;
    loading?: boolean;
};
