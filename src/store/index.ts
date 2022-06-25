import {combineReducers} from "@reduxjs/toolkit"

import { user } from "./user"
import { posts } from "./posts"
import { clients } from "./clients"
import { app } from "./app"





const rootReducer = combineReducers({
    user,
    posts,
    clients,
    app
})

export type rootReducerType = ReturnType<typeof rootReducer>
export {rootReducer}