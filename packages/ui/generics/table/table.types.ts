export interface TableColumnInterface {
    name: string;
    key: string;
    type?: "date" | "date_time" | "currency" | "stock" | "image" | string;
    sort?: boolean;
    className?: string;
    renderValue?: (data: any) => any;
    isVisible?: boolean;
    url?: string | ((item: any) => string);
}
type rowActionType = {
    name: string;
    key: string;
    action?: (data: any) => any;
    isVisible?: (data: any) => any | boolean;
};
export interface TableInterface {
    columns: TableColumnInterface[];
    data?: any[];
    rowActions?: rowActionType[];
    enableLocalPagination?: boolean;
    enableNumbering?: boolean;
    isZebraTable?: boolean;
    loading?: boolean;
}
