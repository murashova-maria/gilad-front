export type Client = {
    id: number
    name: string
    team: string
}

export interface IClientsState {
    clients: Client[]
}