export interface IUserInfo {
    login: null | string
    email: null | string
    is_active: boolean
}

export interface IUserState extends IUserInfo {
    token: string | null
    errorMessage: null | string
}

export interface ILoginType {
    username: string
    password: string
}