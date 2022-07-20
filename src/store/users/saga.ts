import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Users } from "../../api/Users";
import { userSelector } from "../user/hooks";
import {
  usersAddUser,
  usersAppendUser,
  usersGetUsers,
  usersSetErrMessage,
  usersSetUsers,
  usersDeleteUser,
  usersDetachUser,
  usersSetIsFetching,
  usersEditUser,
  usersUpdateUser,
} from "./actions";
import { IAddUser, IEditUser, IUser } from "./types";

export function* usersWatcher() {
  yield takeLatest(usersGetUsers, getUsers);
  yield takeLatest(usersAddUser, addUser);
  yield takeLatest(usersDeleteUser, deleteUser);
  yield takeLatest(usersEditUser, editUser);
}

function* getUsers() {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(usersSetIsFetching(true));
    const [dataRes, dataErr]: [IUser[], any] = yield call(
      handle,
      Users.getUsers(token)
    );
    if (dataRes) {
      yield put(usersSetUsers(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
    yield put(usersSetIsFetching(false));
  }
}

function* addUser(action: { payload: IAddUser }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(usersSetIsFetching(true));
    yield put(usersSetErrMessage(null));
    const [dataRes, dataErr]: [IUser, any] = yield call(
      handle,
      Users.addUser(action.payload, token)
    );
    if (dataRes) {
      yield put(usersAppendUser(dataRes));
    }
    if (dataErr) {
      yield put(usersSetErrMessage(dataErr.error));
    }
    yield put(usersSetIsFetching(false));
  }
}

function* deleteUser(action: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(usersSetIsFetching(true));
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      Users.deleteUser(action.payload, token)
    );
    if (!dataErr) {
      yield put(usersDetachUser(action.payload));
    }
    if (dataErr) {
      console.log(dataErr);
    }
    yield put(usersSetIsFetching(false));
  }
}

function* editUser(action: { payload: IEditUser }) {
  const { token } = yield select(userSelector);
  const { selectedUserId } = yield select((state) => state.users);
  if (token && selectedUserId) {
    yield put(usersSetIsFetching(true));
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      Users.editUser(action.payload, selectedUserId, token)
    );
    if (dataRes) {
      yield put(usersUpdateUser(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
    yield put(usersSetIsFetching(false));
  }
}
