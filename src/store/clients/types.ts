export interface IClient {
    id: number
    name: string
    team: string
    email: string[]
}

export interface IClientsState {
    clients: IClient[]
    isLoading: boolean
}