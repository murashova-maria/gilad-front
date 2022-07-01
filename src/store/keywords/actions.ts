import { createAction } from "@reduxjs/toolkit";
import { AddKeyword, IKeyword } from "./types";

export const keywordsGetKeywords = createAction('keywords/getKeywords')
export const keywordsSetKeywords = createAction<IKeyword[]>('keywords/setKeywords')

export const keywordsSetLoading = createAction<boolean>('keywords/setLoading')

export const keywordsAddKeyword = createAction<AddKeyword>('keywords/addKeyword')

export const keywordsAppendKeyword = createAction<IKeyword>('keywords/appendKeyword')