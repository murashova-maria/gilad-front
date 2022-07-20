import { spawn } from "redux-saga/effects";
import { clientsWatcher } from "./clients/saga";
import { postsWatcher } from "./posts/saga";
import { userWatcher } from "./user/saga";
import { keywordsWatcher } from "./keywords/saga";
import { usersWatcher } from "./users/saga";


export function* rootSaga() {
    yield spawn(userWatcher)
    yield spawn(postsWatcher)
    yield spawn(clientsWatcher)
    yield spawn(keywordsWatcher)
    yield spawn(usersWatcher)
}