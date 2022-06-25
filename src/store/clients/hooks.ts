import { useDispatch, useSelector } from 'react-redux'
import {rootReducerType} from '..'
import { clientsGetClients } from './actions'
import { IClientsState } from './types'

export const clientsSelector = (state: any) => state.clients

export const useClientsState = ():IClientsState => useSelector(clientsSelector)

export const useClientsActions = () => {
    const dispatch = useDispatch()

    const onGetClients = () => {
        dispatch(clientsGetClients())
    }

    return {
        onGetClients,
    }
}