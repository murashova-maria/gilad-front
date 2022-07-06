import { axiosInstance } from "."
import { IClient } from "../store/clients"

export const Clients = {
    getClients: async (token: string) => {
        return await axiosInstance.get('clients/',  {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    addClient: async (client: Omit<IClient, 'id'> ,token: string) => {
        return await axiosInstance.post('clients/', client, {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    editClient: async (client: IClient ,token: string) => {
        return await axiosInstance.post(`clients/${client.id}/`, client, {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    deleteClient: async (id: number, token:string) => {
        return await axiosInstance.delete(`clients/${id}`, {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}