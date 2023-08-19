import type { Request } from "express";
export type DictionaryType = Record<string, any>;

export type WithUserRequestType = Request & {
    user: DictionaryType;
};
