import { createAction } from "@reduxjs/toolkit";
import { Client } from "./types";

export const clientsGetClients = createAction('clients/getClients')
export const clientsSetClients = createAction<Client[]>('clients/setClients')
