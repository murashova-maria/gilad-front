import { createReducer } from "@reduxjs/toolkit";
import {
  postsSetGovils,
  postsSetNews,
  postsSetAgendas,
  postsSetGoogleNews,
  postsSetCommittees,
  postsSetPlenums,
  postsSetQueries,
  postsSetBills,
  postsSetReleases,
  postsSetEditor
} from "./actions";
import { IPostsState, IPost } from "./types";

const initialState: IPostsState = {
  editorPost: null,
  govils: [],
  news: [],
  agendas: [],
  googleNews: [],
  committees: [],
  plenums: [],
  queries: [],
  bills: [],
  releases: [],
};

const posts = createReducer(initialState, {
  [postsSetEditor.type]: (state, action: { payload: IPost }) => {
    return {
      ...state,
      editorPost: action.payload
    };
  },
  [postsSetGovils.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      govils: action.payload,
    };
  },
  [postsSetNews.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      news: action.payload,
    };
  },
  [postsSetAgendas.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      agendas: action.payload,
    };
  },
  [postsSetGoogleNews.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      googleNews: action.payload
    };
  },
  [postsSetCommittees.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      committees: action.payload
    };
  },
  [postsSetPlenums.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      plenums: action.payload
    };
  },
  [postsSetQueries.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      queries: action.payload
    };
  },
  [postsSetBills.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      bills: action.payload
    };
  },
  [postsSetReleases.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      releases: action.payload
    };
  },
});

export default posts;
