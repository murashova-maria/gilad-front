import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { setIsModalOpen } from "./actions";

export const appSelector = (state: rootReducerType) => state.app

export const useAppState = () => useSelector(appSelector)

export const useAppActions = () => {
    const dispatch = useDispatch()

    const onSetModalOpen = (isOpen: boolean) => {
        dispatch(setIsModalOpen(isOpen))
    }

    return {
        onSetModalOpen
    }
}