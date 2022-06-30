import {combineReducers} from "@reduxjs/toolkit"

import { user } from "./user"
import { posts } from "./posts"
import { clients } from "./clients"
import { app } from "./app"
import { keywords } from "./keywords"





const rootReducer = combineReducers({
    user,
    posts,
    clients,
    keywords,
    app
})

export type rootReducerType = ReturnType<typeof rootReducer>
export {rootReducer}