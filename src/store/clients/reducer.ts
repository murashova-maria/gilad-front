import { createReducer } from "@reduxjs/toolkit";
import { clientsSetClients, clientsSetLoading } from "./actions";
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
    }
})

export default clients