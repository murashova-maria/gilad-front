import { axiosInstance } from "."

export const Keywords = {
    getKeywords: async (token: string) => {
        return await axiosInstance.get('keywords/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}