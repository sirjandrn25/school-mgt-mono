"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DictionaryType } from "core";
import { ArrayUtils } from "helper-utils";
import { FormEvent, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateEffect } from "react-use";
import { InputField, SelectBox, TextareaInput } from "ui";
import { z } from "zod";
import { EmptyFunction } from "../../../utils/common.utils";
import { FormBuilderInterface, SchemaType } from "../formBuilder.types";

//single validation object get
const getZodValidation = (type: any, displayLabel: string, validation: any) => {
    let zodValidation: any;

    switch (type) {
        case "number":
        case "stock_input":
            zodValidation = z.number({
                required_error: `${displayLabel} is required`,
            });
            break;
        case "creatable_select":
            zodValidation = z.array(z.string());
            break;
        case "currency_input":
            zodValidation = z.number({
                required_error: `${displayLabel} is required`,
            });
            break;

        case "files":
            zodValidation = z.array(z.string());
            break;
        case "email":
            zodValidation = z
                .string({
                    required_error: `${displayLabel} is required`,
                })
                .email({});
            break;
        default:
            zodValidation = z.string({
                required_error: `${displayLabel} is required`,
            });
    }
    const keys = Object.keys(validation);

    // make full validation object
    zodValidation = keys.reduce((prev: any, next: any) => {
        const value: any = validation[next];
        switch (next) {
            case "minLength":
                return prev?.min(value);
            case "maxLength":
                return prev?.max(value);
            case "required":
                if (["text", "textarea"].includes(type))
                    return prev?.nonempty();
                return prev;
            case "pattern":
                return prev?.pattern(new RegExp(value));
            default:
                return prev?.optional();
        }
    }, zodValidation);

    return zodValidation;
};

//form schema whole validations generate
const getZodSchema = (fields: any) => {
    let schema: any = {};
    for (let field of fields) {
        const { name, label: displayLabel, required, type, validation } = field;

        if (!required && !validation) {
            // schema[name] = Joi.string().optional().allow(null).empty("");
            continue;
        }
        schema[name] = getZodValidation(type, displayLabel, {
            ...validation,
            required: required,
        });
    }

    return z.object({ ...schema });
};

const useFormBuilder = ({
    fields,
    initValues,
    onSubmit = EmptyFunction,
}: FormBuilderInterface) => {
    const {
        handleSubmit: handleReactHookSubmit,
        control,
        formState,
        getValues,

        reset,
    } = useForm({
        resolver: zodResolver(getZodSchema(fields)),
        defaultValues: initValues,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useUpdateEffect(() => {
        reset(initValues);
    }, [initValues]);
    const { errors } = formState;

    const sanitizeError = (() => {
        let tempError: any = {};
        Object.keys(errors).forEach((key) => {
            tempError[key] = errors[key]?.message;
        });
        return tempError;
    })();

    const handleResetForm = (data: any = {}, config: any = {}) => {
        reset(data, config);
    };

    const renderFormField = useCallback(
        (name: string, schema?: SchemaType, props?: any) => {
            const field: DictionaryType =
                ArrayUtils.getObject(fields, "name", name) || {};

            const { label, type, placeholder, ...rest } = field || {};

            return (
                <Controller
                    {...{ name, control }}
                    render={({ field }) => {
                        return (
                            <FormElement
                                {...{ type, field }}
                                {...{
                                    error: sanitizeError[name],
                                    name,
                                    value: getValues(name),
                                    label,
                                    ...rest,
                                    placeholder:
                                        placeholder || `Enter ${label}`,
                                }}
                            />
                        );
                    }}
                />
            );
        },
        [control, fields, getValues, sanitizeError]
    );
    const handleSubmit = handleReactHookSubmit(
        async (values: DictionaryType) => {
            if (isSubmitting) return;
            setIsSubmitting(true);
            const result = await onSubmit({ ...getValues(), ...values });
            setIsSubmitting(false);
        }
    );

    return {
        handleSubmit,
        renderFormField,
        handleResetForm,
        isSubmitting,
    };
};

const FormElement = ({ type, field, ...rest }: any) => {
    switch (type) {
        // case "currency_input":
        //   return <CurrencyInput {...field} {...rest} />

        // case "async_select":
        //   return (
        //     <AsyncSelectBox
        //       {...field}
        //       onChange={(value) => field.onChange(value?.value)}
        //       {...rest}
        //     />
        //   )
        case "select":
            return (
                <SelectBox
                    {...field}
                    onChange={(value) => field.onChange(value?.value)}
                    {...rest}
                />
            );
        case "textarea":
            return (
                <TextareaInput {...field} type={type} {...field} {...rest} />
            );
        // case "files":
        //   return (
        //     <FileUploaderInput
        //       {...field}
        //       {...rest}
        //       files={rest?.value}
        //       onChange={(files) => {
        //         field.onChange(files)
        //       }}
        //     />
        //   )

        default:
            return <InputField type={type} {...field} {...rest} />;
    }
};

export default useFormBuilder;
