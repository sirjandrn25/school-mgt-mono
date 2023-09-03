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

const AddStudent = ({ data = {}, callback = EmptyFunction }: any) => {
    const isEdit = !!data?.id;
    const { data: courses } = useQueryList({
        end_point: "courses",
    });
    const onSubmit: formBuilderSubmitType = useCallback(
        async (values) => {
            const { success } = await ApiService.postRequest(
                "/students",
                isEdit ? { ...values, id: data?.id } : values
            );
            if (!success) {
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
                required: true,
            },
            {
                label: "Mother Name",
                name: "mother_name",
                required: true,
            },
            {
                label: "Address",
                name: "address",
                type: "textarea",
                required: true,
            },
            {
                label: "Address",
                name: "address",
                required: true,
            },
            {
                label: "Course",
                name: "course",
                options: parseSelectBoxOptions(courses, "id", "name"),
                type: "select",
                disabled: isEdit,
                required: true,
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
