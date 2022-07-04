import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import {
  keywordsGetKeywords,
  keywordsAddKeyword,
  keywordsSelectKeyword,
  keywordsSetSelected,
  keywordsEditKeyword,
  keywordsDeleteKeyword,
} from "./actions";
import { IAddKeyword, IEditKeyword, IKeywordsState } from "./types";

export const keywordsSelector = (state: rootReducerType) => state.keywords;

export const useKeywordsState = (): IKeywordsState =>
  useSelector(keywordsSelector);

export const useKeywordsActions = () => {
  const dispatch = useDispatch();

  const onGetKeywords = () => {
    dispatch(keywordsGetKeywords());
  };

  const onAddKeyword = (keyword: IAddKeyword) => {
    if (keyword.keyword) {
      dispatch(keywordsAddKeyword(keyword));
    }
  };

  const onSelectKeyword = (id: number) => {
    dispatch(keywordsSelectKeyword(id));
  };

  const onDeselectKeyword = () => {
    dispatch(keywordsSetSelected(null));
  };

  const onEditKeyword = (keyword: IEditKeyword) => {
    if (keyword.keyword) {
      dispatch(keywordsEditKeyword(keyword))
    }
  };

  const onDeleteKeyword = (id: number) => {
    dispatch(keywordsDeleteKeyword(id))
  }

  return {
    onGetKeywords,
    onAddKeyword,
    onSelectKeyword,
    onDeselectKeyword,
    onEditKeyword,
    onDeleteKeyword,
  };
};
