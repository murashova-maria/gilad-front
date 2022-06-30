import { createReducer } from "@reduxjs/toolkit";
import { IKeyword, IKeywordsState } from "./types";
import {keywordsSetKeywords} from './actions'


const initialState: IKeywordsState = {
    keywords: []
}

const keywords = createReducer(initialState, {
    [keywordsSetKeywords.type]: (state, action: { payload: IKeyword[]}) => {
        return {
          ...state,
          keywords: action.payload
        }
      }
})

export default keywords