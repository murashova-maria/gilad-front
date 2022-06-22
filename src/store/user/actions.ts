import { createAction } from "@reduxjs/toolkit";

export const userSetToken = createAction<string | null>('user/setToken')