import { useDispatch, useSelector } from 'react-redux'
import {rootReducerType} from '..'
import { clientsGetClients, clientsAddClient } from './actions'
import { IClient, IClientsState } from './types'

export const clientsSelector = (state: any) => state.clients

export const useClientsState = ():IClientsState => useSelector(clientsSelector)

export const useClientsActions = () => {
    const dispatch = useDispatch()

    const onGetClients = () => {
        dispatch(clientsGetClients())
    }

    const onAddClient = (client: IClient) => {
        if (client.name && client.email.length > 0) {
            dispatch(clientsAddClient(client))
        }
    }

    return {
        onGetClients,
        onAddClient
    }
}