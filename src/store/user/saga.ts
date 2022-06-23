import {call, put, takeLatest} from "redux-saga/effects";
import { userLogin } from "./actions";
import { ILoginType } from "./types";

export function* userWatcher() {
    yield takeLatest(userLogin, login)
}

function* login(payload: any) {
    yield console.log(payload)
}