import { spawn } from "redux-saga/effects";
import { userWatcher } from "./user/saga";

export function* rootSaga() {
    yield spawn(userWatcher)
}