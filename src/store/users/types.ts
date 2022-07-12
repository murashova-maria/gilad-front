import { IClient } from "../clients"

export interface IUser {
    id: number
    login: string
    email: string
    is_active: boolean
    is_staff: boolean
    clients: IClient[]
}


export interface IAddUser {
    login: string
    password: string,
    email: string
    is_staff: boolean,
    is_active: boolean,
    clients: number[]
}

export interface IEditUser {
    login: string
    password?: string,
    email: string
    is_staff: boolean,
    is_active: boolean,
    clients: number[]
}

export interface IUsersState {
    users: IUser[]
    selectedUserId: number | null
    isFetching: boolean
    errorMessage: string | null
}