import { cn } from "tailwind-config";

export const ModalContainer = ({ className, title, children }: any) => {
    return (
        <div className={cn(" flex flex-col ", className)}>
            {title && (
                <div className="w-full p-4 text-lg font-bold bg-base-200">
                    {title}
                </div>
            )}
            {children}
        </div>
    );
};

export const ModalBody = ({ className, children }: any) => {
    return (
        <div className={cn("flex p-4 bg-base-100 w-full", className)}>
            {children}
        </div>
    );
};
