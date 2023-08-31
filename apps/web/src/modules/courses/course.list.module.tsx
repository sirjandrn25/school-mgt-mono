import useQueryList from "@hooks/useQueryList.hook";
import React from "react";
import { TableInterface, Table } from "ui";

const CourseListModule = () => {
    const { data } = useQueryList({ end_point: "courses" });
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
