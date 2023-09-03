import { cn } from "tailwind-config";
import { Button } from "../../components";
import useFormBuilder from "./Hooks/useFormBuilder.hook";
import { FormBuilderInterface } from "./formBuilder.types";

const FormBuilder = ({
    fields,
    layout,
    onSubmit,
    children,
    initValues,
    className,
    ...rest
}: FormBuilderInterface) => {
    const { renderFormField, handleSubmit, isSubmitting } = useFormBuilder({
        fields,
        initValues,
        onSubmit,
    });
    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-4 w-full", className)}
        >
            <LayoutWrapper {...{ layout }}>
                {fields.map((field) => {
                    return renderFormField(field?.name, undefined, field);
                })}
            </LayoutWrapper>
            {children ? (
                children({ onSubmit: handleSubmit })
            ) : (
                <Button loading={isSubmitting}>Save</Button>
            )}
        </form>
    );
};

const LayoutWrapper = ({ layout, children }: any) => {
    return (
        <div
            className={cn(
                {
                    "grid grid-cols-1": layout === "one",
                    "grid grid-cols-2": layout === "two",
                    "grid grid-cols-3": layout === "three",
                },
                " gap-4"
            )}
        >
            {children}
        </div>
    );
};

export default FormBuilder;
