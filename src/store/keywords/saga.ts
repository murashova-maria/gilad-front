import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Keywords } from "../../api/Keywords";
import { userSelector } from "../user/hooks";
import { keywordsGetKeywords, keywordsSetKeywords } from "./actions";

export function* keywordsWatcher() {
  yield takeLatest(keywordsGetKeywords, getKeywords);
}

function* getKeywords(): any {
  console.log("saga called");
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Keywords.getKeywords(token));
    if (dataRes) {
      yield put(keywordsSetKeywords(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
