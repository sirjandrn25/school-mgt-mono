import { forwardRef } from "react";
import {
    SelectBox,
    TextareaInput,
    InputField,
    DatePicker,
    DatePickerInput,
} from "../../../components";

export const FormElements = forwardRef(
    ({ type, field, ...rest }: any, ref: any) => {
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
            case "date":
                return (
                    <DatePickerInput
                        {...field}
                        onChange={(value: any) => field.onChange(value?.value)}
                        {...rest}
                        ref={ref}
                    />
                );
            case "select":
                return (
                    <SelectBox
                        {...field}
                        onChange={(value) => field.onChange(value?.value)}
                        {...rest}
                        ref={ref}
                    />
                );
            case "textarea":
                return (
                    <TextareaInput
                        {...field}
                        type={type}
                        {...field}
                        {...rest}
                        ref={ref}
                    />
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
                return (
                    <InputField type={type} {...field} {...rest} ref={ref} />
                );
        }
    }
);
