export interface IKeyword {
    id: number
    keyword: string
}

export type AddKeyword = {
    keyword: string
    clients: number[]
}

export interface IKeywordsState {
    keywords: IKeyword[]
    isLoading: boolean
}