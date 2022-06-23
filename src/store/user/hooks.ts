import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { userSetToken } from "./actions";
import { IUserState } from "./types";


export const userSelector = (state: rootReducerType) => state.user

export const useUserState = (): IUserState => {
    return useSelector(userSelector)
}

export const useUserActions = () => {
    const dispatch = useDispatch()

    const onLogin = (loginData: {login: string, password: string}) => {
        console.log(loginData)
    }

    //////////////// 
    const onSetToken = (token: string) => {
        dispatch(userSetToken(token))
    }

    return {
        onSetToken,
        onLogin
    }
}