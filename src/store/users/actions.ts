import { createAction } from "@reduxjs/toolkit";
import { IAddUser, IEditUser, IUser } from "./types";

export const usersSetIsFetching = createAction<boolean>('users/setUsersSetIsFetching')
export const usersSetErrMessage = createAction<string | null>('users/setErrMessage')

export const usersSelectUser = createAction<number | null>('users/selectUser')

export const usersGetUsers = createAction('users/getUsers')
export const usersSetUsers = createAction<IUser[]>('users/setUsers')

export const usersAddUser = createAction<IAddUser>('users/addUser')
export const usersAppendUser = createAction<IUser>('users/appendUser')

export const usersDeleteUser = createAction<number>('users/deleteUser')
export const usersDetachUser = createAction<number>('usres/detachUser')

export const usersEditUser = createAction<IEditUser>('users/editUser')
export const usersUpdateUser = createAction<IEditUser>('users/updateUser')


