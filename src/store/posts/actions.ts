import { createAction } from "@reduxjs/toolkit";
import { IEmail, IPost, IDeletePost, node } from "./types";

//Editor
export const postsSetEditor = createAction<IPost | null>('posts/setEditor')

//Fetch All Posts
export const postsGetAllPosts = createAction('posts/getAllPosts')

//Govils
export const postsSetGovils = createAction<IPost[]>('posts/setGovils')

//News
export const postsSetNews = createAction<IPost[]>('posts/setNews')

//Agendas
export const postsSetAgendas = createAction<IPost[]>('posts/setAgendas')

// Google News
export const postsSetGoogleNews = createAction<IPost[]>('posts/setGoogleNews')

//Committees
export const postsSetCommittees = createAction<IPost[]>('posts/setCommittees')

// Plenums
export const postsSetPlenums = createAction<IPost[]>('posts/setPlenums')

// Plenums
export const postsSetPersons = createAction<IPost[]>('posts/setPersons')

// Queries
export const postsSetQueries = createAction<IPost[]>('posts/setQueries')

//Bills
export const postsSetBills = createAction<IPost[]>('posts/setBills')

//Releases
export const postsSetReleases = createAction<IPost[]>('posts/setReleases')

//Gov Statistics
export const postsSetGovStatistics = createAction<IPost[]>('posts/setGovStatistics')

//Govil Data
export const postsSetGovilData = createAction<IPost[]>('posts/setGovilData')

//Govil PDF
export const postsSetGovilPdf = createAction<IPost[]>('posts/setGovilPdf')



//Send modified email
export const postsSendEmail = createAction<IEmail>('posts/sendEmail')

//Delete post
export const PostDelete = createAction<IDeletePost>("posts/deleteActions")
export const successDeleted = createAction<{node: string}>("posts/successDeleteAction")


//Set new posts available
export const postsIncrementNewPosts = createAction("posts/incrementNewPosts")
export const postsResetNewPosts = createAction("posts/resetNewPosts")

//Set is fetching
export const postsSetIsFetching = createAction<boolean>("posts/setIsFetching")
