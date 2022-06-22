import {createReducer} from '@reduxjs/toolkit'
import { userSetToken } from './actions'
import { IUserState } from './types'

const initialState: IUserState = {
    token: null
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