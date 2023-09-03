import GenericTableList, {
    GenericTableListInterface,
} from "@components/genericTableList/genericTableList.component";

const CourseListModule = () => {
    const generic_table_props: GenericTableListInterface = {
        type: "courses",
        actions: [
            {
                name: "Add New",
                key: "add_new",
                action: () => {},
                type: "create",
                outline: true,
            },
        ],
        table_columns: [
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
    return <GenericTableList {...generic_table_props} />;
};

export default CourseListModule;
