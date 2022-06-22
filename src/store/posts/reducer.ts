import {createReducer} from '@reduxjs/toolkit'
import { postsSetPosts } from './actions'
import { IPostsState, IPost } from './types'

const initialState: IPostsState = {
    posts: []
}

const posts = createReducer(initialState, {
    [postsSetPosts.type]: (state, action: {paylaod: IPost[]}) => {
        return {
            ...state,
            posts: action.paylaod
        }
    }
})

export default posts