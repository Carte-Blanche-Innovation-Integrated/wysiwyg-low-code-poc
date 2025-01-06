import {atom} from "jotai";
import type {pageDataLoader} from "@/server/page-data";

export const pageData$ = atom<ReturnType<typeof pageDataLoader>>(null);