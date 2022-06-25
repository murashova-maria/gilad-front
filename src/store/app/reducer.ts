import { createReducer } from "@reduxjs/toolkit";
import { setIsModalOpen } from "./actions";
import { IAppState } from "./types";


const initialState: IAppState = {
    isModalOpen: false
}

const app = createReducer(initialState, {
    [setIsModalOpen.type]: (state, action: {payload: boolean}) => {
        return {
            ...state,
            isModalOpen: action.payload
        }
    }
})

export default app