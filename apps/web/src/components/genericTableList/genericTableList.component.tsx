import Container from "@components/container.component";
import useQueryList from "@hooks/useQueryList.hook";
import { Plus } from "lucide-react";
import { useCallback } from "react";

import { Button, Table, TableColumnInterface } from "ui";

export type tableAction = {
    name: string;
    key: string;
    action: () => void;
    type?: "create" | string;
    [key: string]: any;
};
export interface GenericTableListInterface {
    type: (typeof api_routes)[number];
    table_columns: TableColumnInterface[];
    actions?: tableAction[];
}

const GenericTableList = ({
    table_columns,
    type,
    actions,
}: GenericTableListInterface) => {
    const { data, pagination, setPagination } = useQueryList({
        end_point: type,
    });
    const renderAction = useCallback(() => {
        if (!actions?.length) return null;
        return (
            <div className="flex items-center justify-end gap-2">
                {actions.map((action) => {
                    return (
                        <Button
                            {...action}
                            key={action?.key}
                            onClick={action?.action}
                        >
                            {action?.type === "create" && <Plus />}
                            {action?.name}
                        </Button>
                    );
                })}
            </div>
        );
    }, [actions]);
    return (
        <Container className="gap-4">
            {renderAction()}
            <Table {...{ data, pagination, columns: table_columns }} />
        </Container>
    );
};

export default GenericTableList;
