import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Posts } from "../../api/Posts";
import { userSelector } from "../user/hooks";
import {
  postsGetGovils,
  postsAddPosts,
  postsGetNews,
  postsGetAgendas,
  postsGetGoogleNews,
  postsAddGoogleNews,
  postsGetCommittees,
  postsGetPlenums,
  postsGetQueries,
  postsGetBills,
} from "./actions";
import { postsSelector } from "./hooks";

export function* postsWatcher() {
  yield takeLatest(postsGetGovils, getGovils);
  yield takeLatest(postsGetNews, getNews);
  yield takeLatest(postsGetAgendas, getAgendas);
  yield takeLatest(postsGetGoogleNews, getGoogleNews);
  yield takeLatest(postsGetCommittees, getCommittees);
  yield takeLatest(postsGetPlenums, getPlenums);
  yield takeLatest(postsGetQueries, getQueries);
  yield takeLatest(postsGetBills, getBills);


}

function* getGovils(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Posts.getGovils(token));
    if (dataRes) {
      yield put(postsAddPosts(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getNews(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Posts.getNews(token));
    if (dataRes) {
      yield put(postsAddPosts(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getAgendas(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Posts.getAgendas(token));
    if (dataRes) {
      yield put(postsAddPosts(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getGoogleNews(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Posts.getGoogleNews(token));
    if (dataRes) {
      yield put(postsAddGoogleNews(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getCommittees():any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr] = yield call(handle, Posts.getCommittees(token));
      if (dataRes) {
        yield put(postsAddPosts(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getPlenums(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr] = yield call(handle, Posts.getPlenums(token));
      if (dataRes) {
        yield put(postsAddPosts(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getQueries(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr] = yield call(handle, Posts.getQueries(token));
      if (dataRes) {
        yield put(postsAddPosts(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getBills(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr] = yield call(handle, Posts.getBills(token));
      if (dataRes) {
        console.log(dataRes)
        yield put(postsAddPosts(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}