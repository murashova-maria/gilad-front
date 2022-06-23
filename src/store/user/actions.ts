import { createAction } from "@reduxjs/toolkit";
import { ILoginType, IUserInfo } from "./types";

export const userLogin = createAction<ILoginType>('user/login')
export const userSetError = createAction<null | string>('user/setError')
export const userSetLogin = createAction<string>('user/setLogin')
export const userGetInfo = createAction<string | null>('user/getInfo')
export const userSetInfo = createAction<IUserInfo>('user/setInfo')

