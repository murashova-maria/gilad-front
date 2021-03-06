import { call, fork, all, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Posts } from "../../api/Posts";
import { userSelector } from "../user/hooks";
import { usePostsState } from "../posts/hooks";
import {
  postsSetGovils,
  postsSetNews,
  postsSetAgendas,
  postsSetGoogleNews,
  postsSetCommittees,
  postsSetPlenums,
  postsSetPersons,
  postsSetQueries,
  postsSetBills,
  postsSetReleases,
  postsSetGovStatistics,
  postsSetGovilData,
  postsSetGovilPdf,
  postsSendEmail,
  PostDelete,
  postsGetAllPosts,
  postsResetNewPosts,
  postsSetIsFetching,
  postsSetErrorMessage,
  postsSetSuccessMessage,
} from "./actions";

import { IEmail, IPost, IDeletePost, IPostsState, node } from "./types";

export function* postsWatcher() {
  yield takeLatest(postsGetAllPosts, getAll);
  yield takeLatest(postsSendEmail, sendEmail);
  yield takeLatest(PostDelete, deletePost);
}

function* getAll(): any {
  yield put(postsSetIsFetching(true))
  yield all([
    call(getGovils),
    call(getNews),
    call(getAgendas),
    call(getGoogleNews),
    call(getCommittees),
    call(getPlenums),
    call(getPersons),
    call(getQueries),
    call(getBills),
    call(getReleases),
    call(getGovStatistics),
    call(getGovilData),
    call(getGovilPdf),
  ]);
  yield put(postsSetIsFetching(false))
  yield put(postsResetNewPosts());
}

function* getGovils(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getGovils(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getNews(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getAgendas(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getGoogleNews(token)
    );
    if (dataRes) {
      yield put(postsSetGoogleNews(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getCommittees(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getCommittees(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getPlenums(token)
    );
    if (dataRes) {
      yield put(postsSetPlenums(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getPersons(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getPersons(token)
    );
    if (dataRes) {
      yield put(postsSetPersons(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getQueries(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getQueries(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getBills(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getReleases(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getGovStatistics(token)
    );
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getGovilData(token)
    );
    if (dataRes) {
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
    const [dataRes, dataErr]: [undefined | IPost[], any] = yield call(
      handle,
      Posts.getGovilPdf(token)
    );
    if (dataRes) {
      yield put(postsSetGovilPdf(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* sendEmail({ payload }: { payload: IEmail }) {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      Posts.sendEmail(payload, token)
    );
    if (!dataErr) {
      yield put(postsSetSuccessMessage('emails_send-success'))
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(postsSetErrorMessage(dataErr.error))
    }
  }
}

function* deletePost({ payload }: { payload: IDeletePost }) {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      Posts.deletePost(payload, token)
    );
    if (!dataErr) {
      yield put(postsGetAllPosts());
    } else {
      console.log(dataErr);
    }
  }
}
