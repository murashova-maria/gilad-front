import { createAction } from "@reduxjs/toolkit";
import { ILoginType } from "./types";

export const userSetToken = createAction<string | null>('user/setToken')
export const userLogin = createAction<ILoginType>('user/login')