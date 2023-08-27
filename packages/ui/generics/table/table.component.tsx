"use client";
import { ObjectUtils } from "helper-utils";
import { Link } from "lucide-react";
import { useMemo, useState } from "react";
import { IsFunction, IsUndefined } from "../../utils/common.utils";
import Pagination from "./components/pagination.component";
import TableBody from "./components/table.body.component";
import TableHeader from "./components/table.header.component";
import { TableInterface } from "./table.types";

export const Table = ({
    columns,
    data = [],
    rowActions = [],
    enableLocalPagination = true,
    enableNumbering = true,
    isZebraTable = false,
    loading = false,
}: TableInterface) => {
    const [sortInfo, setSortInfo] = useState<any>();

    const [filterState, setFilterState] = useState<any>({
        limit: 5,
        page: 1,
    });

    const filterData = useMemo(() => {
        const { limit, page } = filterState;
        if (!limit || !page) return data;
        const start = limit * (page - 1);

        const end = start + limit;

        return data.slice(start, end);
    }, [data, filterState]);

    const sortedData = (() => {
        if (!sortInfo || !filterData || !filterData.length) return filterData;

        const { key, order, type } = sortInfo;
        const sort_data = [...filterData];
        switch (type || typeof data[0][key]) {
            case "number":
                sort_data.sort((prev: any, next: any) => {
                    return prev[key] - next[key];
                });
                break;
            case "date":
                sort_data.sort((prev: any, next: any) => {
                    return (
                        (new Date(prev[key]) as any) -
                        (new Date(next[key]) as any)
                    );
                });
                break;
            default:
                sort_data.sort((prev: any, next: any) => {
                    return prev[key].localeCompare(next[key]);
                });
        }
        if (order === "desc") return [...sort_data.reverse()];
        return [...sort_data];
    })();

    const handleSortInfoData = (key: any, type: any) => {
        if (!sortInfo || sortInfo.key !== key) {
            setSortInfo({
                key,
                type,
                order: "asc",
            });
            return;
        }
        if (sortInfo.order === "desc") setSortInfo(null);
        else
            setSortInfo({
                key,
                type,
                order: "desc",
            });
    };

    const getRowDropDownOptions: any = (item: any) => {
        return rowActions.map((row) => {
            const { name, action, isVisible } = row;
            return {
                name,

                action: (value: any) => (action ? action(item) : null),
                isVisible: isVisible
                    ? typeof isVisible === "boolean"
                        ? isVisible
                        : isVisible(item)
                    : undefined,
            };
        });
    };

    const parseToUrl = (item: any, column: any) => {
        if (IsFunction(column.url)) return column.url(item);
        return column?.url;
    };

    const parseColumnItem = (item: any, column: any) => {
        const value = ObjectUtils.accessNestedValue(item, column.key);

        if (IsFunction(column?.renderValue)) return column?.renderValue(item);
        //parse url value
        let columnValue: any;
        if (IsUndefined(value)) return "-";
        switch (column.type) {
            case "currency":
                // columnValue = FormatCurrency(value || 0);
                break;
            case "date":
                // columnValue = FormatDisplayDate(value);
                break;
            case "stock":
                break;

            default:
                columnValue = value;
        }

        if (column?.url) {
            return (
                <div className="text-info hover:underline">
                    <Link href={parseToUrl(item, column)}>{columnValue}</Link>
                </div>
            );
        }
        return columnValue;
    };

    return (
        <div className={`overflow-hidden rounded-lg border   m-5`}>
            <table className="table w-full text-sm text-left text-gray-500 border-collapse">
                <TableHeader {...{ enableNumbering, columns, rowActions }} />
                <TableBody
                    {...{ data: sortedData, rowActions, enableNumbering }}
                />
            </table>
            {!loading && !data.length && (
                <div className="min-h-[250px] bg-base-100 w-full flex items-center justify-center">
                    No Data Found !!!
                </div>
            )}
            {loading && (
                <div className="min-h-[250px] bg-base-100 w-full flex items-center justify-center">
                    loading data !!!
                </div>
            )}
            {enableLocalPagination && !!data.length && (
                <Pagination
                    {...filterState}
                    total={data?.length}
                    onChangePagination={(value: any) =>
                        setFilterState({
                            ...filterState,
                            ...value,
                        })
                    }
                />
            )}
        </div>
    );
};
