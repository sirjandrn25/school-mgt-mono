import { DictionaryType } from "core";
import { InputInterface, SelectBoxInterface } from "../../components";

export interface ValidationInterface {
    minLength?: number;
    maxLength?: number;
    isRequired?: number;
    pattern?: string;
}

export type SchemaBaseType = InputInterface & {
    label?: string;
    name: string;
    isRequired?: boolean;
    validation?: ValidationInterface;
    className?: string;
};

export type SchemaInputType = SchemaBaseType & {
    type?:
        | "text"
        | "number"
        | "password"
        | "email"
        | "checkbox"
        | "textarea"
        | "currency_input"
        | "stock_input"
        | "creatable_select";
};

export type FileSchemaType = SchemaBaseType & {
    type: "files";
    isMultiple?: boolean;
};

export type SelectSchemaType = SchemaBaseType & {
    type: "select" | "radio" | "async_select";
    api?: any;
    document_id?: number;
    queryParams?: any;
} & SelectBoxInterface;

export type ObjectSchemaType = SchemaBaseType & {
    type: "object";
    formSchema: InputOrSelectType;
} & InputInterface;
export type InputOrSelectType =
    | SchemaInputType
    | SelectSchemaType
    | FileSchemaType;

export type SchemaType = InputOrSelectType | ObjectSchemaType;

type childrenType = {
    onSubmit: (data: any) => void;
    error?: any;
    formData?: any;
};
type submitOtherProps = {
    setError: (error: DictionaryType) => void;
};
export type formBuilderSubmitType = (
    data: DictionaryType,
    options: submitOtherProps
) => void;
export interface FormBuilderInterface {
    fields: SchemaType[];
    onSubmit?: formBuilderSubmitType;
    initValues?: any;
    className?: string;
    layout?: "one" | "two" | "three";
    handleSubmit?: any;
    children?: (data: childrenType) => any;
    submitLabel?: string | any;
    hiddenSubmit?: boolean;
}
