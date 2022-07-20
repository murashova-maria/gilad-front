import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { usersAddUser, usersDeleteUser, usersEditUser, usersGetUsers, usersSelectUser, usersSetErrMessage, usersSetIsFetching } from "./actions";
import { IAddUser, IUsersState } from "./types";

const usersSelector = (state: rootReducerType) => state.users

export const useUsersState = (): IUsersState => useSelector(usersSelector)


export const useUsersActions = () => {
    const dispatch = useDispatch()

    const onSetErrMessage = (mes: string | null) => {
        dispatch(usersSetErrMessage(mes))
    }

    const onGetUsers = () => {
        dispatch(usersGetUsers())
    }

    const onAddUser = (user: IAddUser) => {
        dispatch(usersAddUser(user))
    }

    const onDeleteUser = (id: number) => {
        dispatch(usersDeleteUser(id))
    }

    const onSelectUser = (id: number | null) => {
        dispatch(usersSelectUser(id))
    }

    const onEditUser = (user: any) => {
        dispatch(usersEditUser(user))
    }

    return {
        onSelectUser,
        onSetErrMessage,
        onAddUser,
        onDeleteUser,
        onEditUser,
        onGetUsers
    }
}