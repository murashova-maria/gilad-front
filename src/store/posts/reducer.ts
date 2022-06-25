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
  postsSetEditor,
  postsSetGovStatistics,
  postsAddNewPost,
  postsSetGovilData,
  postsSetGovilPdf
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
  govStatistics: [],
  govilData: [],
  govilPdf: [],
  newPosts: [],
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
  [postsSetGovStatistics.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      govStatistics: action.payload
    };
  },
  [postsSetGovilData.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      govilData: action.payload
    };
  },
  [postsSetGovilPdf.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      govilPdf: action.payload
    };
  },
  [postsAddNewPost.type]: (state, action: { payload: IPost[] }) => {
    return {
      ...state,
      newPosts: [action.payload, ...state.newPosts]
    };
  },
});

export default posts;
