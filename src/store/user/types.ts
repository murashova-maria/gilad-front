export interface IUserState {
    isLogin: boolean
    token: string | null
    errorMessage: null | string
    userInfo: any
}

export interface ILoginType {
    username: string
    password: string
}