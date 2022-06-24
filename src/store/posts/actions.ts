import { createAction } from "@reduxjs/toolkit";
import { IPost } from "./types";

//Editor
export const postsSetEditor = createAction<IPost | null>('posts/setEditor')


//Govils
export const postsGetGovils = createAction('posts/getGovils')
export const postsSetGovils = createAction<IPost[]>('posts/setGovils')

//News
export const postsGetNews = createAction('posts/getNews')
export const postsSetNews = createAction<IPost[]>('posts/setNews')

//Agendas
export const postsGetAgendas = createAction('posts/getAgendas')
export const postsSetAgendas = createAction<IPost[]>('posts/setAgendas')

// Google News
export const postsGetGoogleNews = createAction('posts/getGoogleNews')
export const postsSetGoogleNews = createAction<IPost[]>('posts/setGoogleNews')

//Committees
export const postsGetCommittees = createAction('posts/getCommittees')
export const postsSetCommittees = createAction<IPost[]>('posts/setCommittees')

// Plenums
export const postsGetPlenums = createAction('posts/getPlenums')
export const postsSetPlenums = createAction<IPost[]>('posts/setPlenums')

// Queries
export const postsGetQueries = createAction('posts/getQueries')
export const postsSetQueries = createAction<IPost[]>('posts/setQueries')

//Bills
export const postsGetBills = createAction('posts/getBills')
export const postsSetBills = createAction<IPost[]>('posts/setBills')

//Releases
export const postsGetReleases = createAction('posts/getReleases')
export const postsSetReleases = createAction<IPost[]>('posts/setReleases')

//Gov Statistics
export const postsGetGovStatistics = createAction('posts/getGovStatistics')
export const postsSetGovStatistics = createAction<IPost[]>('posts/setGovStatistics')

//Govil Data
export const postsGetGovilData = createAction('posts/getGovilData')
export const postsSetGovilData = createAction<IPost[]>('posts/setGovilData')



//New Posts (Web Socket)
export const postsAddNewPost = createAction<IPost[]>('posts/addNewPost')

