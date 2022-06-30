import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Keywords } from "../../api/Keywords";
import { userSelector } from "../user/hooks";
import { keywordsGetKeywords, keywordsSetKeywords, keywordsSetLoading } from "./actions";

export function* keywordsWatcher() {
  yield takeLatest(keywordsGetKeywords, getKeywords);
}

function* getKeywords(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(keywordsSetLoading(true))
    const [dataRes, dataErr] = yield call(handle, Keywords.getKeywords(token));
    yield put(keywordsSetLoading(false))
    if (dataRes) {
      yield put(keywordsSetKeywords(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
