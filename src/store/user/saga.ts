import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { User } from "../../api/User";
import { userLogin, userSetError, userSetLogin, userGetInfo, userSetInfo } from "./actions";
import { userSelector } from "./hooks";
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

function* getInfo(): any {
  const { token } = yield select(userSelector)
  if (token) {
    const [dataRes, dataErr]: [IUserInfo, any] = yield call(handle, User.getInfo(token));
    if (dataRes) {
        yield put(userSetInfo(dataRes))
    }
    if (dataErr) {
      console.log(dataErr)
    }
  }
}
