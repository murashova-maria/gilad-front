import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { userLogin, userGetInfo } from "./actions";
import { ILoginType, IUserState } from "./types";


export const userSelector = (state: rootReducerType) => state.user

export const useUserState = (): IUserState => {
    return useSelector(userSelector)
}

export const useUserActions = () => {
    const dispatch = useDispatch()

    const onLogin = (loginData: ILoginType) => {
        dispatch(userLogin(loginData))
    }

    const onGetUserInfo = (token: string | null) => {
        dispatch(userGetInfo(token))
    }

    return {
        onLogin,
        onGetUserInfo
    }
}