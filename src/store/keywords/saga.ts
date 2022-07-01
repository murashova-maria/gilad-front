import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Keywords } from "../../api/Keywords";
import { userSelector } from "../user/hooks";
import {
  keywordsGetKeywords,
  keywordsSetKeywords,
  keywordsSetLoading,
  keywordsAddKeyword,
  keywordsAppendKeyword,
  keywordsSelectKeyword,
  keywordsSetSelected
} from "./actions";
import { IAddKeyword, IKeyword, ISelectedKeyword } from "./types";

export function* keywordsWatcher() {
  yield takeLatest(keywordsGetKeywords, getKeywords);
  yield takeLatest(keywordsAddKeyword, addKeyword);
  yield takeLatest(keywordsSelectKeyword, selectKeyword);
}

function* getKeywords(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(keywordsSetLoading(true));
    const [dataRes, dataErr] = yield call(handle, Keywords.getKeywords(token));
    yield put(keywordsSetLoading(false));
    if (dataRes) {
      yield put(keywordsSetKeywords(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* addKeyword({payload}: {type: string, payload: IAddKeyword}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(keywordsSetLoading(true));
    const [dataRes, dataErr] = yield call(handle, Keywords.addKeyword(payload, token));
    yield put(keywordsSetLoading(false));
    if (dataRes) {
      const {id, keyword}: IKeyword = dataRes
      yield put(keywordsAppendKeyword({id, keyword}))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* selectKeyword({payload}: {type: string, payload: number}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(keywordsSetLoading(true));
    const [dataRes, dataErr]: [ISelectedKeyword | undefined, any] = yield call(handle, Keywords.getKeyword(payload, token));
    yield put(keywordsSetLoading(false));
    if (dataRes) {
      yield put(keywordsSetSelected(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}