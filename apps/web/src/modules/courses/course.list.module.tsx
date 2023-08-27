import React from "react";
import { TableInterface, Table } from "ui";

const CourseListModule = () => {
    const data = [
        {
            id: 1,
            name: "See Course",
        },
        {
            id: 2,
            name: "+2 Course",
        },
    ];
    const table_props: TableInterface = {
        data,
        columns: [
            {
                name: "Name",
                key: "name",
            },
            {
                name: "Description",
                key: "description",
            },
        ],
    };
    return <Table {...table_props} />;
};

export default CourseListModule;
