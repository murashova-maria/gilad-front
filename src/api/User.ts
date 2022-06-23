import { axiosInstance } from "."
import { ILoginType } from "../store/user/types"

export const User = {
    login: async(params: ILoginType) => {
        return await axiosInstance.post('login/', params)
    }
}