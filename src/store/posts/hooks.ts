import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { postsGetPosts } from "./actions";
import { IPostsState } from "./types";


export const postsSelector = (state: rootReducerType) => state.posts

export const usePostsState = (): IPostsState => {
    return useSelector(postsSelector)
}

export const usePostsActions = () => {
    const dispatch = useDispatch()

    const onGetPosts = () => {
        dispatch(postsGetPosts())
    }
    
    return {
        onGetPosts
    }
}