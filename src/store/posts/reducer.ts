import {createReducer} from '@reduxjs/toolkit'
import { postsAddGoogleNews, postsAddPosts } from './actions'
import { IPostsState, IPost } from './types'

const initialState: IPostsState = {
    posts: [],
    googleNews: []
}

const posts = createReducer(initialState, {
    [postsAddPosts.type]: (state, action: {payload: any[]}) => {
        return {
            ...state,
            posts: [...state.posts, ...action.payload]
        }
    },
    [postsAddGoogleNews.type]: (state, action: {payload: any[]}) => {
        return {
            ...state,
            googleNews: [...state.googleNews, ...action.payload]
        }
    }
})

export default posts