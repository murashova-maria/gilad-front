import { createReducer } from "@reduxjs/toolkit";
import { IKeyword, IKeywordsState, ISelectedKeyword } from "./types";
import {
  keywordsSetKeywords,
  keywordsSetLoading,
  keywordsAppendKeyword,
  keywordsSetSelected,
  keywordsUpdateKeyword
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
  [keywordsUpdateKeyword.type]: (state, action: { payload: ISelectedKeyword }) => {
    // case when updateable keyword is not the selected keyword
    if (action.payload.id !== state.selectedKeyword?.id) {
      let newKeywords = [...state.keywords]
      const index = newKeywords.findIndex(k => k.id === action.payload.id)
      newKeywords.splice(index, 1, action.payload)
      return {
        ...state,
        keywords: newKeywords
      }
    }
    // Cases when we update selected keyword
    if (action.payload.id === state.selectedKeyword?.id) {
      let newKeywords = [...state.keywords]
      const index = newKeywords.findIndex(k => k.id === action.payload.id)
      newKeywords.splice(index, 1, action.payload)
      return {
        ...state,
        selectedKeyword: action.payload,
        keywords: newKeywords
      }
    }
  },
});

export default keywords;
