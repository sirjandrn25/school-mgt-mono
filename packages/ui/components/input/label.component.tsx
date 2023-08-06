import { cn } from "tailwind-config";
import { LabelInterface } from "./input.types";

const Label = ({ error, label, required }: LabelInterface) => {
    if (!label) return <></>;
    return (
        <label
            htmlFor="input_id"
            className={cn("label-text font-medium", {
                "text-error": error,
            })}
        >
            <span>{label}</span>{" "}
            {required && <span className="text-error">*</span>}
        </label>
    );
};

export default Label;
