import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import {
  postsSetEditor,
  postsSendEmail,
  PostDelete,
  postsIncrementNewPosts,
  postsGetAllPosts,
} from "./actions";
import { IEmail, IPost, IPostsState, IDeletePost } from "./types";
import { ws } from "../../api";

export const postsSelector = (state: rootReducerType) => state.posts;

export const usePostsState = (): IPostsState => useSelector(postsSelector);

export const useAllPosts = (): IPost[] => {
  return useSelector((state: rootReducerType) => {
    return [
      ...state.posts.govils,
      ...state.posts.news,
      ...state.posts.agendas,
      ...state.posts.googleNews,
      ...state.posts.committees,
      ...state.posts.plenums,
      ...state.posts.persons,
      ...state.posts.queries,
      ...state.posts.bills,
      ...state.posts.releases,
      ...state.posts.govStatistics,
      ...state.posts.govilData,
      ...state.posts.govilPdf,
    ].sort((prev, next) => next.date_for_sorting - prev.date_for_sorting);
  });
};

export const useGoogleNews = (): IPost[] => {
  return useSelector((state: rootReducerType) => {
    return [...state.posts.googleNews].sort(
      (prev, next) => next.date_for_sorting - prev.date_for_sorting
    );
  });
};

export const useOtherPosts = (): IPost[] => {
  return useSelector((state: rootReducerType) => {
    return [
      ...state.posts.govils,
      ...state.posts.news,
      ...state.posts.agendas,
      ...state.posts.committees,
      ...state.posts.plenums,
      ...state.posts.persons,
      ...state.posts.queries,
      ...state.posts.bills,
      ...state.posts.releases,
      ...state.posts.govStatistics,
      ...state.posts.govilData,
      ...state.posts.govilPdf,
    ].sort((prev, next) => next.date_for_sorting - prev.date_for_sorting);
  });
};

export const usePostsActions = () => {
  const dispatch = useDispatch();

  const onGetPosts = () => {
    dispatch(postsGetAllPosts())
  };

  // Add new posts from WebSocket
  const onWatchForPosts = (token: string) => {
    const channel = ws(token);
    channel.addEventListener('open', () => {

    })
    channel.addEventListener('message', (e) => {
      if (e.data) {
        const {data} = JSON.parse(e.data)
        console.log(e.data)
        if (data) dispatch(postsIncrementNewPosts())
      }
    })
  };

  const onSetEditor = (post: IPost | null) => {
    dispatch(postsSetEditor(post));
  };

  const onSendEmail = (email: IEmail) => {
    dispatch(postsSendEmail(email));
  };

  const onDeletePost = (payload: IDeletePost) => {
    dispatch(PostDelete(payload));
  };

  return {
    onGetPosts,
    onDeletePost,
    onWatchForPosts,
    onSetEditor,
    onSendEmail,
  };
};
