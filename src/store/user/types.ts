export interface IUserState {
    isLogin: boolean
    token: string | null
    errorMessage: null | string
    userInfo: any
}

export interface ILoginType {
    login: string
    password: string
}