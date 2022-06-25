import {combineReducers} from "@reduxjs/toolkit"

import { user } from "./user"
import { posts } from "./posts"
import { clients } from "./clients"




const rootReducer = combineReducers({
    user,
    posts,
    clients
})

export type rootReducerType = ReturnType<typeof rootReducer>
export {rootReducer}