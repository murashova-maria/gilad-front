import axios, {AxiosResponse} from "axios"

const apiUrl = 'https://gilad.stoi.co/api/'

export const axiosInstance = axios.create({
    baseURL: apiUrl
})

export const ws = new WebSocket("wss://gilad.stoi.co/ws/");

export const handle = (promise: Promise<AxiosResponse<any>>) => {
    return promise
        .then(data => ([data.data, undefined]))
        .catch(error => Promise.resolve([undefined, error?.response?.data || error?.response || error]));
}