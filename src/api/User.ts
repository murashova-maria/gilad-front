import { axiosInstance } from "."
import { ILoginType } from "../store/user/types"

export const User = {
    login: async(params: ILoginType) => {
        return await axiosInstance.post('login/', params)
    },
    getInfo: async(token: string) => {
        return await axiosInstance.get('user_info/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}