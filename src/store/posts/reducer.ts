import { createReducer } from "@reduxjs/toolkit";
import {
  postsSetGovils,
  postsSetNews,
  postsSetAgendas,
  postsSetGoogleNews,
  postsSetCommittees,
  postsSetPlenums,
  postsSetPersons,
  postsSetQueries,
  postsSetBills,
  postsSetReleases,
  postsSetEditor,
  postsSetGovStatistics,
  postsSetGovilData,
  postsSetGovilPdf,
  postsIncrementNewPosts,
  postsResetNewPosts,
  postsSetIsFetching,
  successDeleted,
  postsSetErrorMessage,
  postsSetSuccessMessage
} from "./actions";
import { IPostsState, IPost, IDeletePost } from "./types";

const initialState: IPostsState = {
  editorPost: null,
  newPostsAvailable: 0,
  isFetching: false,
  errorMessage: null,
  successMessage: null,
  govils: [],
  news: [],
  agendas: [],
  googleNews: [],
  committees: [],
  plenums: [],
  persons: [],
  queries: [],
  bills: [],
  releases: [],
  govStatistics: [],
  govilData: [],
  govilPdf: [],
};

const posts = createReducer(initialState, {
  [postsSetEditor.type]: (state, action: { payload: IPost }) => {
    return {
      ...state,
      editorPost: action.payload
    };
  },
  [postsSetGovils.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "govil"}))
    return {
      ...state,
      govils: newPosts
    };
  },
  [postsSetNews.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "news"}))
    return {
      ...state,
      news: newPosts
    };
  },
  [postsSetAgendas.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "agendas"}))
    return {
      ...state,
      agendas: newPosts
    };
  },
  [postsSetGoogleNews.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "google_news"}))
    return {
      ...state,
      googleNews: newPosts
    };
  },
  [postsSetCommittees.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "committee_session"}))
    return {
      ...state,
      committees: newPosts
    };
  },
  [postsSetPlenums.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "plenum_session"}))
    return {
      ...state,
      plenums: newPosts
    };
  },
  [postsSetPersons.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "person_to_position"}))
    return {
      ...state,
      persons: newPosts
    };
  },
  [postsSetQueries.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "query"}))
    return {
      ...state,
      queries: newPosts
    };
  },
  [postsSetBills.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "bill"}))
    return {
      ...state,
      bills: newPosts
    };
  },
  [postsSetReleases.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "press_release"}))
    return {
      ...state,
      releases: newPosts
    };
  },
  [postsSetGovStatistics.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "gov_statisctics"}))
    return {
      ...state,
      govStatistics: newPosts
    };
  },
  [postsSetGovilData.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "govil_data"}))
    return {
      ...state,
      govilData: newPosts
    };
  },
  [postsSetGovilPdf.type]: (state, action: { payload: IPost[] }) => {
    const newPosts = action.payload.map(post => ({...post, _sender: "govil_pdf"}))
    return {
      ...state,
      govilPdf: newPosts
    };
  },
  [successDeleted.type]: (state, action: { payload: IPostsState}) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [postsIncrementNewPosts.type]: (state) => {
    return {
      ...state,
      newPostsAvailable: state.newPostsAvailable + 1
    }
  },
  [postsResetNewPosts.type]: (state) => {
    return {
      ...state,
      newPostsAvailable: 0
    }
  },
  [postsSetIsFetching.type]: (state, action: {payload: boolean}) => {
    return {
      ...state,
      isFetching: action.payload
    }
  },
  [postsSetErrorMessage.type]: (state, action: {payload: string | null}) => {
    return {
      ...state,
      errorMessage: action.payload
    }
  },
  [postsSetSuccessMessage.type]: (state, action: {payload: string | null}) => {
    return {
      ...state,
      successMessage: action.payload
    }
  }
});

export default posts;
