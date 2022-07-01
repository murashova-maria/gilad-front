import { createReducer } from "@reduxjs/toolkit";
import { IKeyword, IKeywordsState, ISelectedKeyword } from "./types";
import {
  keywordsSetKeywords,
  keywordsSetLoading,
  keywordsAppendKeyword,
  keywordsSetSelected,
} from "./actions";

const initialState: IKeywordsState = {
  keywords: [],
  isLoading: false,
  selectedKeyword: null,
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
      keywords: [...state.keywords, action.payload],
    };
  },
  [keywordsSetSelected.type]: (state, action: { payload: ISelectedKeyword }) => {
    return {
      ...state,
      selectedKeyword: action.payload
    };
  },
});

export default keywords;
