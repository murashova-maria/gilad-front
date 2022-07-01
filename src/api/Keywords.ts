import { axiosInstance } from "."
import { AddKeyword } from "../store/keywords"

export const Keywords = {
    getKeywords: async (token: string) => {
        return await axiosInstance.get('keywords/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    addKeyword: async (params: AddKeyword, token: string) => {
        return await axiosInstance.post('keywords/', params, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    }
}