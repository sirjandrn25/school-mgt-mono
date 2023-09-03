import useQueryList from "@hooks/useQueryList.hook";
import { DictionaryType } from "core";

const useGenericList = (
    type: (typeof api_routes)[number],
    options: DictionaryType
) => {
    const { data, isLoading, pagination, setPagination } = useQueryList({
        end_point: type,
    });

    return {
        data,
        isLoading,
        pagination,
        setPagination,
    };
};

export default useGenericList;
