import { axiosInstance } from "."
import { IEmail } from "../store/posts"


export const Posts = {
    getGovils: async (token: string) => {
        return await axiosInstance.get('gilad/govil/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getNews: async (token: string) => {
        return await axiosInstance.get('gilad/news/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getAgendas: async (token: string) => {
        return await axiosInstance.get('gilad/agendas/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGoogleNews: async (token: string) => {
        return await axiosInstance.get('gilad/google_news/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getCommittees: async (token: string) => {
        return await axiosInstance.get('gilad/committee_session/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getPlenums: async (token: string) => {
        return await axiosInstance.get('gilad/plenum_session/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getQueries: async (token: string) => {
        return await axiosInstance.get('gilad/query/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getBills: async (token: string) => {
        return await axiosInstance.get('gilad/bill/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getReleases: async (token: string) => {
        return await axiosInstance.get('gilad/press_release/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGovStatistics: async (token: string) => {
        return await axiosInstance.get('gilad/gov_statisctics/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGovilData: async (token: string) => {
        return await axiosInstance.get('gilad/govil_data/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGovilPdf: async (token: string) => {
        return await axiosInstance.get('gilad/govil_pdf/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    sendEmail: async (params: IEmail,token: string) => {
        return await axiosInstance.post('api/send_email/',params,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    }
}