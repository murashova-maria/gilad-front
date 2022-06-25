import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Clients } from "../../api/Clients";
import { userSelector } from "../user/hooks";
import { clientsGetClients, clientsSetClients } from "./actions";

export function* clientsWatcher() {
  yield takeLatest(clientsGetClients, getClients);
}

function* getClients(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Clients.getClients(token));
    if (dataRes) {
        yield put(clientsSetClients(dataRes))
    }
    if (dataErr) {
        console.log(dataErr)
    }
  }
}
