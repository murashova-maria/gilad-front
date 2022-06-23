import { spawn } from "redux-saga/effects";
import { postsWatcher } from "./posts/saga";
import { userWatcher } from "./user/saga";

export function* rootSaga() {
    yield spawn(userWatcher)
    yield spawn(postsWatcher)
}