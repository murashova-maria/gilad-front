import { call, put, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { User } from "../../api/User";
import { userLogin, userSetError, userSetLogin, userGetInfo, userSetInfo } from "./actions";
import { ILoginType, IUserInfo } from "./types";

export function* userWatcher() {
  yield takeLatest(userLogin, login);
  yield takeLatest(userGetInfo, getInfo);
}

function* login(action: { type: string; payload: ILoginType }): any {
  const [dataRes, dataErr] = yield call(handle, User.login(action.payload));
  if (dataRes) {
    yield put(userSetLogin(dataRes.token));
  }
  if (dataErr) {
    yield put(userSetError(dataErr.non_field_errors[0]));
  }
}

function* getInfo(action: { type: string; payload: string | null }): any {
  if (action.payload) {
    const [dataRes, dataErr]: [IUserInfo, any] = yield call(handle, User.getInfo(action.payload));
    if (dataRes) {
        console.log(dataRes)
        yield put(userSetInfo(dataRes))
    }
  }
}
