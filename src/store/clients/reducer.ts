import { createReducer } from "@reduxjs/toolkit";
import { clientsSetClients } from "./actions";
import { Client, IClientsState } from "./types";



const initialState: IClientsState = {
    clients: []
}

const clients = createReducer(initialState, {
    [clientsSetClients.type]: (state, action: {payload: Client[]}) => {
        return {
            ...state,
            clients: action.payload
        }
    }
})

export default clients