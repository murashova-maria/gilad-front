import {createReducer} from '@reduxjs/toolkit'
import { userSetError, userSetToken, userSetLogin } from './actions'
import { IUserState } from './types'

const initialState: IUserState = {
    isLogin: false,
    token: null,
    errorMessage: null,
    userInfo: null,
}

const user = createReducer(initialState, {
    [userSetToken.type]: (state, action: {payload: string}) => {
        return {
            ...state,
            token: action.payload
        }
    },
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
            isLogin: true,
            errorMessage: null
        }
    }
})

export default user