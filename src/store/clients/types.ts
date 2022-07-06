export interface IClient {
    id: number
    name: string
    team: string
    email: string[] | null
}

export interface IPostCardClient extends IClient {
    sended: boolean
}

export interface IClientsState {
    clients: IClient[]
    isLoading: boolean
    errorMessage: string | null
}