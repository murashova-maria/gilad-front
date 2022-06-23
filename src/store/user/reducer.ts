import {createReducer} from '@reduxjs/toolkit'
import { userSetToken } from './actions'
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
    }
})

export default user