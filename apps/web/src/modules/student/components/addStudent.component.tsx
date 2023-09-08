import useQueryList from "@hooks/useQueryList.hook";
import ApiService from "@utils/api.service.utils";
import React, { useCallback } from "react";
import {
    FormBuilderInterface,
    ModalBody,
    ModalContainer,
    ModalUtil,
    formBuilderSubmitType,
    parseSelectBoxOptions,
} from "ui";
import FormBuilder from "ui/generics/formBuilder/formBuilder";
import { EmptyFunction } from "ui/utils/common.utils";
import Toast from "ui/utils/toast.utils";

const AddStudent = ({ data = {}, callback = EmptyFunction }: any) => {
    const isEdit = !!data?.id;
    const { data: courses } = useQueryList({
        end_point: "courses",
    });
    const onSubmit: formBuilderSubmitType = useCallback(
        async (values, { setError }) => {
            const { success, response } = await ApiService.postRequest(
                "students/register",
                isEdit ? { ...values, id: data?.id } : values
            );
            if (!success) {
                if (response?.message)
                    return Toast.error({
                        message: response?.message,
                    });
                setError(response);
                return;
            }
            callback();
            ModalUtil.close();
        },
        [callback, data?.id, isEdit]
    );
    const formSchema: FormBuilderInterface = {
        fields: [
            {
                label: "Full Name",
                name: "full_name",
                required: true,
            },
            {
                label: "Father Name",
                name: "father_name",
                // required: true,
            },
            {
                label: "Mother Name",
                name: "mother_name",
                // required: true,
            },

            {
                label: "Birth Date",
                name: "birth_date",
                required: true,
                type: "date",
            },
            {
                label: "Gender",
                name: "gender",
                required: true,
                type: "select",
                options: [
                    {
                        label: "Male",
                        value: "M",
                    },
                    {
                        label: "Female",
                        value: "F",
                    },
                ],
            },
            {
                label: "Course",
                name: "course_id",
                options: parseSelectBoxOptions(courses, "id", "name"),
                type: "select",
                disabled: isEdit,
                required: true,
            },
            {
                label: "Address",
                name: "address",
                type: "textarea",
                required: true,
                className: "col-span-2",
            },
        ],
        layout: "two",
        onSubmit,
        initValues: data,
    };
    return (
        <ModalContainer title="Register New Student">
            <ModalBody>
                <FormBuilder {...formSchema} />
            </ModalBody>
        </ModalContainer>
    );
};

export default AddStudent;
