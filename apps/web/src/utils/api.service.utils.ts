import { DictionaryType } from "core";
import { AuthStorageUtils } from "./storage.utils";
import axios from "axios";

const getAccessToken = (type = "Bearer") => {
    const token = AuthStorageUtils.getAccessToken();
    return `${type} ${token}`;
};
const methods = ["get", "post", "put", "patch", "delete"];
const base_url = `http://localhost:8000`;

const apiRequestHandle = async (
    end_point: string,
    method: (typeof methods)[number],
    options: {
        detail_id?: string;
        data?: DictionaryType;
        is_logged_in?: boolean;
    }
) => {
    const { detail_id, data = {}, is_logged_in = true } = options || {};
    let full_url = `${base_url}/${end_point}`;

    const params = {};

    if (detail_id) {
        full_url = `${full_url}/${detail_id}`;
    }

    if (is_logged_in) {
        params["headers"] = { Authorization: getAccessToken() };
    }
    if (!["get", "delete"].includes(method as any) && !detail_id) {
        params["data"] = data;
    }
    params["url"] = full_url;
    params["method"] = method;
    try {
        const response = await axios({ ...params });
        return {
            success: true,
            response: response.data,
        };
    } catch (error) {
        return {
            success: false,
            response: error?.message,
        };
    }
};
export default class ApiService {
    static async postRequest(
        end_point: string,
        data: DictionaryType,
        is_logged_in: boolean = true
    ) {
        return await apiRequestHandle(end_point, "post", {
            is_logged_in,
            data,
        });
    }
    static async getRequest(end_point: string, is_logged_in: boolean = true) {
        return await apiRequestHandle(end_point, "get", {
            is_logged_in,
        });
    }
}
