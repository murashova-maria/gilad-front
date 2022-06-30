import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Clients } from "../../api/Clients";
import { userSelector } from "../user/hooks";
import { clientsGetClients, clientsSetClients, clientsAddClient, clientsSetLoading } from "./actions";
import { IClient } from "./types";

export function* clientsWatcher() {
  yield takeLatest(clientsGetClients, getClients);
  yield takeLatest(clientsAddClient, addClient);
}

function* getClients(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true))
    const [dataRes, dataErr] = yield call(handle, Clients.getClients(token));
    yield put(clientsSetLoading(false))
    if (dataRes) {
        yield put(clientsSetClients(dataRes))
    }
    if (dataErr) {
        console.log(dataErr)
    }
  }
}

function* addClient({payload}: {payload: IClient}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true))
    const [dataRes, dataErr] = yield call(handle, Clients.addClient(payload, token));
    yield put(clientsSetLoading(false))
    if (dataRes) {
        console.log(dataRes)
    }
    if (dataErr) {
        console.log(dataErr)
    }
  }
}
