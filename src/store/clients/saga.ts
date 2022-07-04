import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Clients } from "../../api/Clients";
import { userSelector } from "../user/hooks";
import {
  clientsGetClients,
  clientsSetClients,
  clientsAddClient,
  clientsSetLoading,
  clientsAppendClient,
  clientsEditClient,
  clientsUpdateClient,
  clientsDeleteClient,
  clientsRemoveClient
} from "./actions";
import { IClient } from "./types";

export function* clientsWatcher() {
  yield takeLatest(clientsGetClients, getClients);
  yield takeLatest(clientsAddClient, addClient);
  yield takeLatest(clientsEditClient, editClient);
  yield takeLatest(clientsDeleteClient, deleteClient);

}

function* getClients(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true));
    const [dataRes, dataErr] = yield call(handle, Clients.getClients(token));
    yield put(clientsSetLoading(false));
    if (dataRes) {
      yield put(clientsSetClients(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* addClient({ payload }: { payload: IClient }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Clients.addClient(payload, token)
    );
    yield put(clientsSetLoading(false));
    if (dataRes) {
      yield put(clientsAppendClient(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* editClient({ payload }: { payload: IClient }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Clients.editClient(payload, token)
    );
    yield put(clientsSetLoading(false));
    if (dataRes) {
      yield put(clientsUpdateClient(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* deleteClient({payload}: {payload: number}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(clientsSetLoading(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Clients.deleteClient(payload, token)
    );
    yield put(clientsSetLoading(false));
    if (!dataErr) {
      yield put(clientsRemoveClient(payload))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }

}