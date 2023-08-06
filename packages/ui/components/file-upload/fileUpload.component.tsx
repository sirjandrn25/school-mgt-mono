/**
 * @author Sirjan Tamang
 */

"use client";
import { ReactNode, useCallback, useState } from "react";
import {
    DropzoneInputProps,
    DropzoneRootProps,
    useDropzone,
} from "react-dropzone";

import { UploadIcon } from "lucide-react";
import { cn } from "tailwind-config";
import { Loading } from "../loading/loading.component";
import { FileUploadInterface, RenderTitleInterface } from "./fileUpload.types";

/**
 * FileUpload component for uploading files.
 * @param {Object} props - The component props.
 * @param {string} [props.title='Upload Files'] - The title of the file upload component for default case.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {number} [props.maxFiles=5] - The maximum number of files allowed to be uploaded.
 * @param {number} [props.maxSize] - The maximum size of each file in bytes.
 * @param {Object} [props.accept] - The accepted file types with corresponding extensions.
 * @param {ReactNode} [props.children] - The content to render inside the file upload component.
 * @param {boolean} [props.is_multiple] - Whether multiple files can be uploaded at once.
 * @param {boolean} [props.disabled=false] - Whether the file upload is disabled.
 * @param {Function} props.onDropFile - The function to handle the dropped files.
 * @param {ReactNode} [props.icon] - The custom icon to render in the file upload component.
 * @param {boolean} [props.autoFocus] - Whether the file upload component should be auto-focused.
 * @param {boolean} [props.noDrag] - Whether the file upload component should disable drag and drop functionality.
 * @returns {ReactNode} The rendered FileUpload component.
 */
export const FileUpload = ({
    title = "Upload Files",
    className,
    maxFiles = 5,
    maxSize,
    accept = {
        "image/jpeg": [],
        "image/png": [],
        "application/pdf": [],
    },
    children,
    is_multiple,
    disabled = false,
    onDropFile,
    icon,
    autoFocus,
    noDrag,
    ...rest
}: FileUploadInterface) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

    const [uploading, setUploading] = useState(false);

    const nextUploading = useCallback(() => setUploading(false), []);

    const onDrop = async (acceptedFiles: any[], fileRejections: any[]) => {
        setUploading(true);

        let isLimitCross: boolean = false;
        const rejectedFiles: any = [];
        if (fileRejections.length > 0) {
            if (maxFiles && fileRejections.length > maxFiles) {
                isLimitCross = true;
            }

            fileRejections.forEach((rejected) => {
                if (
                    rejected?.file &&
                    rejected.file?.size > (maxSize || MAX_SIZE)
                ) {
                    rejectedFiles.push(rejected);
                }
            });
        }
        onDropFile(acceptedFiles, nextUploading, {
            rejectedFiles,
            isLimitCross,
            limit: maxFiles,
            maxSize: `${(maxSize || MAX_SIZE) / (1024 * 1024)} MB`,
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: is_multiple,
        accept,
        maxFiles,
        maxSize: maxSize || MAX_SIZE,
        disabled: disabled || uploading,
        onDrop,
        autoFocus,
        noDrag,
        ...rest,
    });

    return (
        <div className={cn("gap-2 col-flex", className)}>
            {children ? (
                <div
                    className={`
               `}
                    {...getRootProps()}
                >
                    {children({ uploading })}
                    <input {...getInputProps()} />
                </div>
            ) : (
                <DefaultFileUpload
                    {...{
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        uploading,
                        icon,
                        title,
                    }}
                />
            )}
        </div>
    );
};

const DefaultFileUpload = ({
    getRootProps,
    getInputProps,
    isDragActive,
    uploading,
    icon,
    title,
}: {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
    uploading: boolean;
    icon: ReactNode;
    title?: string | React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "items-center justify-center  border-dashed h-32 text-sm  border-color-100 rounded border  flex flex-col",
                {
                    "bg-base-100 text-base-secondary hover:text-base-primary hover:border-primary transition-colors cursor-pointer":
                        !uploading,
                    " bg-base-200 cursor-none": uploading,
                }
            )}
            {...getRootProps()}
        >
            <RenderIcon {...{ uploading, icon }} />
            <UploadingImage {...{ uploading }} />
            <input {...getInputProps()} />
            <RenderTitle {...{ uploading, title, isDragActive }} />
        </div>
    );
};

const RenderIcon = ({
    uploading,
    icon,
}: {
    uploading?: boolean;
    icon?: ReactNode;
}) => {
    if (uploading) return <></>;
    if (icon) return <>{icon}</>;
    return <UploadIcon />;
};

const UploadingImage = ({ uploading }: { uploading?: boolean }) => {
    return uploading ? (
        <div className="items-center gap-2 col-flex">
            <span className="text-primary">
                <Loading appearance="neutral" size="sm" />
            </span>
            <span className="text-base-secondary">Uploading...</span>
        </div>
    ) : (
        <></>
    );
};

const RenderTitle = ({
    uploading,
    title,
    isDragActive,
}: RenderTitleInterface) => {
    if (uploading) return <></>;
    if (!isDragActive) return <>{title || null}</>;
    return <span className="text-disabled-100">Drop here</span>;
};
