import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Posts } from "../../api/Posts";
import { userSelector } from "../user/hooks";
import {
  postsGetGovils,
  postsSetGovils,
  postsGetNews,
  postsSetNews,
  postsGetAgendas,
  postsSetAgendas,
  postsGetGoogleNews,
  postsSetGoogleNews,
  postsGetCommittees,
  postsSetCommittees,
  postsGetPlenums,
  postsSetPlenums,
  postsGetQueries,
  postsSetQueries,
  postsGetBills,
  postsSetBills,
  postsGetReleases,
  postsSetReleases,
  postsGetGovStatistics,
  postsSetGovStatistics,
  postsGetGovilData,
  postsSetGovilData,
  postsGetGovilPdf,
  postsSetGovilPdf
} from "./actions";
import { IPost } from "./types";

export function* postsWatcher() {
  yield takeLatest(postsGetGovils, getGovils);
  yield takeLatest(postsGetNews, getNews);
  yield takeLatest(postsGetAgendas, getAgendas);
  yield takeLatest(postsGetGoogleNews, getGoogleNews);
  yield takeLatest(postsGetCommittees, getCommittees);
  yield takeLatest(postsGetPlenums, getPlenums);
  yield takeLatest(postsGetQueries, getQueries);
  yield takeLatest(postsGetBills, getBills);
  yield takeLatest(postsGetReleases, getReleases);
  yield takeLatest(postsGetGovStatistics, getGovStatistics);
  yield takeLatest(postsGetGovilData, getGovilData);
  yield takeLatest(postsGetGovilPdf, getGovilPdf);
}

function* getGovils(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getGovils(token));
    if (dataRes) {
      yield put(postsSetGovils(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getNews(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getNews(token));
    if (dataRes) {
      yield put(postsSetNews(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getAgendas(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getAgendas(token));
    if (dataRes) {
      yield put(postsSetAgendas(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getGoogleNews(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getGoogleNews(token));
    if (dataRes) {
      yield put(postsSetGoogleNews(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getCommittees():any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getCommittees(token));
      if (dataRes) {
        yield put(postsSetCommittees(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getPlenums(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getPlenums(token));
      if (dataRes) {
        yield put(postsSetPlenums(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getQueries(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getQueries(token));
      if (dataRes) {
        yield put(postsSetQueries(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getBills(): any {
    const { token } = yield select(userSelector);
    if (token) {
      const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getBills(token));
      if (dataRes) {
        yield put(postsSetBills(dataRes));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
}

function* getReleases(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getReleases(token));
    if (dataRes) {
      yield put(postsSetReleases(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* getGovStatistics(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getGovStatistics(token));
    if (dataRes) {
      yield put(postsSetGovStatistics(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getGovilData(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getGovilData(token));
    if (dataRes) {
      console.log(dataRes)
      yield put(postsSetGovilData(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getGovilPdf(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(handle, Posts.getGovilPdf(token));
    if (dataRes) {
      yield put(postsSetGovilPdf(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}