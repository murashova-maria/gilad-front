import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { keywordsGetKeywords, keywordsAddKeyword } from "./actions";
import { IKeywordsState } from "./types";

export const keywordsSelector = (state: rootReducerType) => state.keywords;

export const useKeywordsState = (): IKeywordsState =>
  useSelector(keywordsSelector);

export const useKeywordsActions = () => {
  const dispatch = useDispatch();

  const onGetKeywords = () => {
    dispatch(keywordsGetKeywords());
  };

  const onAddKeyword = (params: { keyword: string; clients: number[] }) => {
    if (params.keyword) {
      dispatch(keywordsAddKeyword(params));
    }
  };

  return {
    onGetKeywords,
    onAddKeyword,
  };
};
