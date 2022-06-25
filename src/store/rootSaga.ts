import { spawn } from "redux-saga/effects";
import { clientsWatcher } from "./clients/saga";
import { postsWatcher } from "./posts/saga";
import { userWatcher } from "./user/saga";

export function* rootSaga() {
    yield spawn(userWatcher)
    yield spawn(postsWatcher)
    yield spawn(clientsWatcher)
}