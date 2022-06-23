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
} from "./actions";
import { IPostsState } from "./types";

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


  };

  return {
    onGetPosts,
  };
};
