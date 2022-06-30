import { createAction } from "@reduxjs/toolkit";
import { IClient } from "./types";

export const clientsGetClients = createAction('clients/getClients')
export const clientsSetClients = createAction<IClient[]>('clients/setClients')

export const clientsSetLoading = createAction<boolean>('clients/setLoading')

export const clientsAddClient = createAction<IClient>('clients/addClient')
