import {createReducer} from '@reduxjs/toolkit'
import { userSetError, userSetLogin, userSetInfo } from './actions'
import { IUserInfo, IUserState } from './types'

const initialState: IUserState = {
    login: null,
    email: null,
    is_active: false,
    token: null,
    errorMessage: null,
}

const user = createReducer(initialState, {
    [userSetError.type]: (state, action: {payload: string | null}) => {
        return {
            ...state,
            errorMessage: action.payload
        }
    },
    [userSetLogin.type]: (state, action: {payload: string}) => {
        return {
            ...state,
            token: action.payload,
            errorMessage: null
        }
    },
    [userSetInfo.type]: (state, action: {payload: IUserInfo}) => {
        return {
            ...state,
            ...action.payload
        }
    }
})

export default user