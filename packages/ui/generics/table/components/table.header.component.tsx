import { cn } from "tailwind-config";

const TableHeader = ({ enableNumbering, columns, rowActions }: any) => {
    return (
        <thead className="p-3 bg-base-200 ">
            <tr>
                {enableNumbering && (
                    <th
                        scope="col"
                        className="w-10 px-6 py-3 font-medium border-b"
                    >
                        SNo.
                    </th>
                )}
                {columns.map((column: any) => {
                    if (column.isVisible === false) return;
                    return (
                        <th
                            scope="col"
                            className={cn(
                                "px-6 py-3 uppercase text-sm border-b font-medium ",
                                {
                                    "hover:cursor-pointer": column?.sort,
                                }
                            )}
                            onClick={() => {
                                column.sort;
                                // handleSortInfoData(column.key, column.type)
                            }}
                            key={column.key}
                        >
                            <span className="uppercase"> {column.name}</span>
                        </th>
                    );
                })}
                {rowActions.length !== 0 && <th className="w-10 border-b"></th>}
            </tr>
        </thead>
    );
};
export default TableHeader;
