import { IClient } from "../clients"

export interface IKeyword {
    id: number
    keyword: string
}

export interface ISelectedKeyword extends IKeyword {
    clients: IClient[]
}

export interface IAddKeyword {
    keyword: string
    clients: number[]
}

export interface IEditKeyword extends IAddKeyword {
    id: number
}

export interface IKeywordsState {
    keywords: IKeyword[]
    isLoading: boolean
    selectedKeyword: ISelectedKeyword | null
}