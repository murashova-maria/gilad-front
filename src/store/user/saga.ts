import {call, put, takeLatest} from "redux-saga/effects";
import { handle } from "../../api";
import { User } from "../../api/User";
import { userLogin, userSetError, userSetLogin } from "./actions";
import { ILoginType } from "./types";

export function* userWatcher() {
    yield takeLatest(userLogin, login)
}

function* login(action: {type: string, payload: ILoginType}): any {
    const [dataRes, dataErr] = yield call(handle, User.login(action.payload))
    if (dataRes) {
        yield put(userSetLogin(dataRes.token))
    }
    if (dataErr) {
        yield put(userSetError(dataErr.non_field_errors[0]))
    }
}