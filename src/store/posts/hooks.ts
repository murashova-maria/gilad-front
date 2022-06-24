import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import {
  postsGetGovils,
  postsGetNews,
  postsGetAgendas,
  postsGetGoogleNews,
  postsGetCommittees,
  postsGetPlenums,
  postsGetQueries,
  postsGetBills,
  postsGetReleases,
  postsSetEditor,
  postsGetGovStatistics,
  postsAddNewPost,
  postsGetGovilData,
} from "./actions";
import { IPost, IPostsState } from "./types";
import { ws } from "../../api";

export const postsSelector = (state: rootReducerType) => state.posts;

export const usePostsState = (): IPostsState => {
  return useSelector(postsSelector);
};

export const usePostsActions = () => {
  const dispatch = useDispatch();

  const onGetPosts = () => {
    dispatch(postsGetGovils());
    dispatch(postsGetNews());
    dispatch(postsGetAgendas());
    dispatch(postsGetGoogleNews());
    dispatch(postsGetCommittees());
    dispatch(postsGetPlenums());
    dispatch(postsGetQueries());
    dispatch(postsGetBills());
    dispatch(postsGetReleases());
    dispatch(postsGetGovStatistics());
    dispatch(postsGetGovilData());
  };

  // Add new posts from WebSocket
  const onWatchForPosts = () => {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({event_type: "test"}))
    })
    ws.addEventListener('message', (e: any) => {
      const {data } = JSON.parse(e.data)
      if (data) {
        dispatch(postsAddNewPost(data))
        console.log('NEw Post', data)
      }
    })
    ws.addEventListener('error', (e) => {
      console.log('web socket closed with error:', e)
    })
    ws.addEventListener('close', (e) => {
      console.log('web socket closed ', e)
    })
  }

  const onCloseWebSocket = () => {
    ws.close()
  }

  const onSetEditor = (post: IPost | null) => {
    dispatch(postsSetEditor(post))
  }


  return {
    onGetPosts,
    onWatchForPosts,
    onCloseWebSocket,
    onSetEditor
  };
};
