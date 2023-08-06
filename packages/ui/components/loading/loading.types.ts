export const LoadingSizes = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
};

export const LoadingAppearance = {
    primary: " text-primary",
    secondary: " text-secondary",
    accent: " text-accent",
    info: " text-info",
    warning: " text-warning",
    error: " text-error",
    ghost: " text-ghost",
    success: " text-success",
    neutral: " text-neutral",
};
export const LoadingVariant = {
    spinner: "loading-spinner",
    dots: "loading-dots",
    ring: "loading-ring",
    ball: "loading-ball",
    bars: "loading-bars",
    infinity: "loading-infinity",
};

export interface LoadingInterface {
    size?: keyof typeof LoadingSizes;
    variant?: keyof typeof LoadingVariant;
    appearance?: keyof typeof LoadingAppearance;
}
