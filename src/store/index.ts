import {combineReducers} from "@reduxjs/toolkit"

import { user } from "./user"
import { posts } from "./posts"



const rootReducer = combineReducers({
    user,
    posts,
})

export type rootReducerType = ReturnType<typeof rootReducer>
export {rootReducer}