import { createAction } from "@reduxjs/toolkit";
import { ILoginType } from "./types";

export const userSetToken = createAction<string | null>('user/setToken')
export const userLogin = createAction<ILoginType>('user/login')
export const userSetError = createAction<null | string>('user/setError')
export const userSetLogin = createAction<string>('user/setLogin')
