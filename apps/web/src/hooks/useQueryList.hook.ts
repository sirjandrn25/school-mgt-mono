import ApiService from "@utils/api.service.utils";
import { DictionaryType } from "core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type queryListType = {
    end_point: string;
    filterParams?: DictionaryType;
    networkDisabled?: boolean;
    isGetMethod?: boolean;
};

const useQueryList = ({
    end_point,
    filterParams = {},
    networkDisabled,
    isGetMethod = true,
}: queryListType) => {
    const [pagination, setPagination] = useState<DictionaryType>({
        limit: 20,
        page: 1,
    });
    const fetchList = async () => {
        if (isGetMethod) {
            const { success, response } = await ApiService.getRequest(
                end_point
            );
            if (success) return response;
            return [];
        }
        const { success, response } = await ApiService.postRequest(end_point, {
            ...filterParams,
            ...pagination,
        });
        if (success) return response;
        return [];
    };
    const {
        data: response = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["list", end_point, filterParams, pagination],
        queryFn: fetchList,
        enabled: !networkDisabled,
    });
    return {
        data: Array.isArray(response) ? response : response?.records || [],
        pagination: { ...(response?.stats || {}) },
        setPagination: setPagination,
        isLoading,
        refetch,
    };
};

export default useQueryList;
