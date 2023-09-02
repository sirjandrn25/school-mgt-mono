import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "tailwind-config";
import { EmptyFunction } from "../../../utils/common.utils";

export const generateArrayNumber = (start = 1, total: number) => {
    let arr: number[] = [];
    for (let i = start; i < total + 1; i++) arr.push(i);
    return arr;
};

const Pagination = ({
    limit = 10,
    page = 1,
    total,
    onChangePagination = EmptyFunction,
}: any) => {
    const [pagination, setPagination] = useState<any>({
        limit,
        page,
        total,
    });

    const handlePaginationChange = useCallback(
        (key: string, value: any) => {
            const newPagination = {
                ...pagination,
                [key]: value,
            };
            if (key === "limit") newPagination["page"] = 1;
            setPagination(newPagination);
            onChangePagination(newPagination);
        },
        [onChangePagination, pagination]
    );

    const renderLimit = useCallback(() => {
        return (
            <div className="flex items-center w-auto gap-4">
                <select
                    onChange={(e: any) => {
                        if (!e.target.value) return;
                        handlePaginationChange("limit", +e.target?.value);
                    }}
                    value={pagination?.limit}
                    className="px-3 py-2 border rounded-md"
                    defaultValue={pagination?.limit}
                >
                    <option value={5} selected={pagination.limit === 5}>
                        5
                    </option>
                    <option value={10} selected={pagination.limit === 10}>
                        10
                    </option>
                    <option value={20} selected={pagination.limit === 20}>
                        20
                    </option>
                    <option value={30} selected={pagination.limit === 30}>
                        30
                    </option>
                    <option value={50} selected={pagination.limit === 50}>
                        50
                    </option>
                </select>
                <div>
                    {pagination.length} Items show out of {pagination.total}
                </div>
            </div>
        );
    }, [
        handlePaginationChange,
        pagination.length,
        pagination.limit,
        pagination.total,
    ]);

    const no_of_pages = useMemo(() => {
        return Math.ceil(pagination.total / pagination.limit);
    }, [pagination.limit, pagination.total]);
    const renderLeftShift = useCallback(() => {
        return (
            <div className="border rounded-full">
                <ChevronLeft
                    onClick={() => {
                        if (pagination?.page === 1) return;
                        handlePaginationChange("page", pagination.page - 1);
                    }}
                    className={cn({
                        "bg-gray-400": pagination?.page === 1,
                    })}
                />
            </div>
        );
    }, [handlePaginationChange, pagination.page]);

    const renderRightShift = useCallback(() => {
        return (
            <div className="border rounded-full">
                <ChevronRight
                    onClick={() => {
                        if (pagination?.page === no_of_pages) return;
                        handlePaginationChange("page", pagination.page + 1);
                    }}
                />
            </div>
        );
    }, [handlePaginationChange, no_of_pages, pagination.page]);

    const middlePages = useMemo(() => {
        if (
            no_of_pages < 11 ||
            pagination.page <= 5 ||
            pagination.page >= no_of_pages - 4
        )
            return [];
        return [pagination.page - 1, pagination.page, pagination.page + 1];
    }, [pagination.page, no_of_pages]);

    const leftPages = useMemo(() => {
        if (middlePages?.length > 1 || pagination?.page > 5) return [1];

        return generateArrayNumber(1, no_of_pages > 5 ? 5 : no_of_pages);
    }, [middlePages?.length, no_of_pages, pagination.page]);

    const rightPages = useMemo(() => {
        if (no_of_pages <= 5) return [];
        if (middlePages?.length || leftPages?.length > 1) return [no_of_pages];
        return generateArrayNumber(no_of_pages - 4, no_of_pages);
    }, [no_of_pages, middlePages?.length, leftPages?.length]);

    const renderPagination = useCallback(() => {
        if (!pagination?.total)
            return <div className="p-2 rounded">{pagination?.page}</div>;
        return (
            <div className="flex items-center gap-2">
                {renderLeftShift()}
                {(leftPages as any).map((page: number) => (
                    <PageDisplay
                        onClick={() => handlePaginationChange("page", page)}
                        key={page}
                        {...{ page, active: page === pagination.page }}
                    />
                ))}
                {!!middlePages.length && !!leftPages?.length && <div>...</div>}
                {(middlePages as any).map((page: number) => (
                    <PageDisplay
                        onClick={() => handlePaginationChange("page", page)}
                        key={page}
                        {...{ page, active: page === pagination.page }}
                    />
                ))}
                {!!rightPages?.length && <div>...</div>}
                {(rightPages as any).map((page: number) => (
                    <PageDisplay
                        onClick={() => handlePaginationChange("page", page)}
                        key={page}
                        {...{ page, active: page === pagination.page }}
                    />
                ))}
                {renderRightShift()}
            </div>
        );
    }, [
        pagination?.total,
        pagination.page,
        renderLeftShift,
        leftPages,
        middlePages,
        rightPages,
        renderRightShift,
        handlePaginationChange,
    ]);

    return (
        <div className="flex items-center justify-between gap-4 p-4 bg-base-200">
            {renderLimit()}
            {renderPagination()}
        </div>
    );
};

const PageDisplay = ({
    page,
    active,
    onClick,
}: {
    page: number;
    active: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                " h-8 w-8 flex cursor-pointer items-center justify-center text-sm border rounded-full ",
                {
                    "bg-accent-500 text-info": active,
                }
            )}
        >
            {page}
        </div>
    );
};

export default Pagination;
