import { createReducer } from "@reduxjs/toolkit";
import { IKeyword, IKeywordsState } from "./types";
import { keywordsSetKeywords, keywordsSetLoading, keywordsAppendKeyword } from "./actions";

const initialState: IKeywordsState = {
  keywords: [],
  isLoading: false,
};

const keywords = createReducer(initialState, {
  [keywordsSetKeywords.type]: (state, action: { payload: IKeyword[] }) => {
    return {
      ...state,
      keywords: action.payload,
    };
  },
  [keywordsSetLoading.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isLoading: action.payload,
    };
  },
  [keywordsAppendKeyword.type]: (state, action: { payload: IKeyword }) => {
    return {
      ...state,
      keywords: [...state.keywords, action.payload]
    };
  },
});

export default keywords;
