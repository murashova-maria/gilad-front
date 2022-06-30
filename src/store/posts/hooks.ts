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
  postsGetGovilPdf,
  postsSendEmail,
  PostDelete,
  postsGetPersons,
} from "./actions";
import { IEmail, IPost, IPostsState, IDeletePost } from "./types";
import { ws } from "../../api";

export const postsSelector = (state: rootReducerType) => state.posts;

export const usePostsState = (): IPostsState => useSelector(postsSelector);

export const usePostsActions = () => {
  const dispatch = useDispatch();

  const onGetPosts = () => {
    dispatch(postsGetGovils());
    dispatch(postsGetNews());
    dispatch(postsGetAgendas());
    dispatch(postsGetGoogleNews());
    dispatch(postsGetCommittees());
    dispatch(postsGetPlenums());
    dispatch(postsGetPersons())
    dispatch(postsGetQueries());
    dispatch(postsGetBills());
    dispatch(postsGetReleases());
    dispatch(postsGetGovStatistics());
    dispatch(postsGetGovilData());
    dispatch(postsGetGovilPdf());
  };

  // Add new posts from WebSocket
  const onWatchForPosts = () => {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({event_type: "test"}))
    })
    ws.addEventListener('message', (e: any) => {
      const data = JSON.parse(e.data)
      console.log('new post', data.data)
      if (data.data) {
         dispatch(postsAddNewPost({...data.data, _sender: data.sender}))
      }
    })
    ws.addEventListener('error', (e) => {
      console.log('web socket closed with error:', e)
    })
    ws.addEventListener('close', (e) => {
      console.log('web socket closed ', e)
      ws.addEventListener('message', (e: any) => {
        const data = JSON.parse(e.data)
        console.log('new post', data.data)
        if (data.data) {
           dispatch(postsAddNewPost({...data.data, _sender: data.sender}))
        }
      })
    })
  }

  const onCloseWebSocket = () => {
    ws.close()
  }

  const onSetEditor = (post: IPost | null) => {
    dispatch(postsSetEditor(post))
  }

  const  onSendEmail = (email: IEmail) => {
    dispatch(postsSendEmail(email))
  }

  const onDeletePost = (payload: IDeletePost) => {
    dispatch(PostDelete(payload))
  }

  return {
    onGetPosts, onDeletePost,
    onWatchForPosts,
    onCloseWebSocket,
    onSetEditor,
    onSendEmail
  };
};
