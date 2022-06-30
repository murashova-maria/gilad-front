import { createReducer } from "@reduxjs/toolkit";
import { clientsSetClients, clientsSetLoading, clientsAppendClient,clientsUpdateClient } from "./actions";
import { IClient, IClientsState } from "./types";



const initialState: IClientsState = {
    clients: [],
    isLoading: false
}

const clients = createReducer(initialState, {
    [clientsSetClients.type]: (state, action: {payload: IClient[]}) => {
        return {
            ...state,
            clients: action.payload
        }
    },
    [clientsSetLoading.type]: (state, action: {payload: boolean}) => {
        return {
            ...state,
            isLoading: action.payload
        }
    },
    [clientsAppendClient.type]: (state, action: {payload: IClient}) => {
        return {
            ...state,
            clients: [...state.clients, action.payload]
        }
    },
    [clientsUpdateClient.type]: (state, action: {payload: IClient}) => {
        const index = state.clients.findIndex(c => c.id === action.payload.id)
        let allClients = [...state.clients]
        allClients.splice(index, 1, action.payload)
        return {
            ...state,
            clients: allClients
        }
    }
})

export default clients