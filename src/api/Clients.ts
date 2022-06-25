import { axiosInstance } from "."

export const Clients = {
    getClients: async (token: string) => {
        return await axiosInstance.get('clients/',  {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}