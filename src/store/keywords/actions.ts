import { createAction } from "@reduxjs/toolkit";
import { IKeyword } from "./types";

export const keywordsGetKeywords = createAction('keywords/getKeywords')
export const keywordsSetKeywords = createAction<IKeyword[]>('keywords/setKeywords')

export const keywordsSetLoading = createAction<boolean>('keywords/setLoading')