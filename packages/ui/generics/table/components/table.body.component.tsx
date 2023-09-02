import { cn } from "tailwind-config";
import TableColumnUtils from "../utils/table.column.utils";
import { Fragment, useCallback } from "react";

const TableBody = ({
    data = [],
    columns = [],
    rowActions = [],
    enableNumbering,
    filterState,
}: any) => {
    const renderTableRow = useCallback(
        ({ row, idx }: any) => {
            return (
                <tr className="hover:bg-gray-50 bg-base-100">
                    {enableNumbering && (
                        <td className="px-6 py-4">
                            {idx +
                                1 +
                                (filterState.page - 1) * filterState?.limit}
                        </td>
                    )}
                    {columns.map((column: any, index: any) => {
                        if (column.isVisible === false) return;

                        return (
                            <td
                                className={cn("px-6  py-4", column?.className)}
                                key={index}
                            >
                                {TableColumnUtils.parseColumn(column, row)}
                            </td>
                        );
                    })}
                    {rowActions.length !== 0 && (
                        <td className="">
                            {/* <ActionMenu actions={getRowDropDownOptions(row)}>
                            <MoreVertical />
                        </ActionMenu> */}
                        </td>
                    )}
                </tr>
            );
        },
        [columns]
    );
    return (
        <tbody className="border-t border-gray-100 divide-y divide-gray-100">
            {data.map((data: any, idx: number) => (
                <Fragment key={data?.id}>
                    {renderTableRow({ row: data, idx: idx })}
                </Fragment>
            ))}
        </tbody>
    );
};

export default TableBody;
