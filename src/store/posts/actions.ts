import { createAction } from "@reduxjs/toolkit";
import { IPost } from "./types";

//Posts Actions
export const postsGetGovils = createAction('posts/getGovils')
export const postsGetNews = createAction('posts/getNews')
export const postsGetAgendas = createAction('posts/getAgendas')
export const postsGetCommittees = createAction('posts/getCommittees')
export const postsGetPlenums = createAction('posts/getPlenums')
export const postsGetQueries = createAction('posts/getQueries')
export const postsGetBills = createAction('posts/getBills')


export const postsAddPosts = createAction<any[]>('posts/setPosts')
// Google News Actions
export const postsGetGoogleNews = createAction('posts/getGoogleNews')
export const postsAddGoogleNews = createAction<any[]>('posts/setGoogleNews')




