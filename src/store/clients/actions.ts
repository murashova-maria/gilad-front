import { createAction } from "@reduxjs/toolkit";
import { IClient } from "./types";

export const clientsGetClients = createAction('clients/getClients')
export const clientsSetClients = createAction<IClient[]>('clients/setClients')

export const clientsSetLoading = createAction<boolean>('clients/setLoading')

export const clientsAddClient = createAction<Omit<IClient, 'id'>>('clients/addClient')
export const clientsAppendClient = createAction<IClient>('clients/appendClient')

export const clientsEditClient = createAction<IClient>('clients/editClient')
export const clientsUpdateClient = createAction<IClient>('clients/updateClient')

export const clientsDeleteClient = createAction<number>('clients/deleteClient')
export const clientsRemoveClient = createAction<number>('clients/removeClient')

export const clientsSetErrorMessage = createAction<string | null>('clients/setErrorMessage')