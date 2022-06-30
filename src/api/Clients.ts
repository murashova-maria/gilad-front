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
    addClient: async (client: IClient ,token: string) => {
        return await axiosInstance.post('clients/', client, {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}