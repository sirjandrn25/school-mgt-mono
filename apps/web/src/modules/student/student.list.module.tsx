"use client";
import GenericTableList, {
    GenericTableListInterface,
} from "@components/genericTableList/genericTableList.component";
import { student } from "@constants/page.route.constant";
import { DictionaryType } from "core";
import React from "react";
import { ModalUtil, formatDisplayDate } from "ui";
import AddStudent from "./components/addStudent.component";
import { GenderEnum } from "@constants/preference.constant";

const studentListModule = () => {
    const openForm = () => {
        ModalUtil.open({
            component: AddStudent,
        });
    };
    const generic_table_props: GenericTableListInterface = {
        type: "students",
        actions: [
            {
                name: "Add New",
                key: "add_new",
                action: openForm,
                type: "create",
                outline: true,
            },
        ],
        table_columns: [
            {
                name: "Full Name",
                key: "full_name",
                url: (item: DictionaryType) => `${student?.detail}${item?.id}`,
            },
            {
                name: "Father Name",
                key: "father_name",
            },
            {
                name: "Mother Name",
                key: "mother_name",
            },
            {
                name: "Birth Date",
                key: "birth_date",
                type: "date",
            },
            {
                name: "Gender",
                key: "gender",
                renderValue: (item: DictionaryType) => {
                    return <div>{GenderEnum[item?.gender]}</div>;
                },
            },
            {
                name: "Address",
                key: "address",
            },
            {
                name: "Registration",
                key: "registration.course.name",
                renderValue: (item: DictionaryType = {}) => {
                    const registration = item?.registration[0];

                    return <div>{registration?.course?.name}</div>;
                },
            },
            {
                name: "Added On",
                key: "registration.created_at",
                renderValue: (item: DictionaryType = {}) => {
                    const registration = item?.registration[0];

                    return (
                        <div>{formatDisplayDate(registration?.created_at)}</div>
                    );
                },
            },
        ],
    };
    return <GenericTableList {...generic_table_props} />;
};

export default studentListModule;
