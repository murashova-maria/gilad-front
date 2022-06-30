import { useDispatch, useSelector } from 'react-redux'
import {rootReducerType} from '..'
import { clientsGetClients, clientsAddClient, clientsEditClient } from './actions'
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

    const onEditClient = (client: IClient) => {
        dispatch(clientsEditClient(client))
    }

    return {
        onGetClients,
        onEditClient,
        onAddClient
    }
}