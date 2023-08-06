import { cn } from "tailwind-config";
import {
    LoadingAppearance,
    LoadingInterface,
    LoadingSizes,
    LoadingVariant,
} from "./loading.types";

export const Loading = ({
    size = "md",
    variant = "spinner",
    appearance = "primary",
}: LoadingInterface) => {
    return (
        <span
            className={cn(
                "loading",
                LoadingSizes[size],
                LoadingVariant[variant],
                LoadingAppearance[appearance]
            )}
        ></span>
    );
};
