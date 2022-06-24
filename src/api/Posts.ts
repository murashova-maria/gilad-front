import { axiosInstance } from "."


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
}