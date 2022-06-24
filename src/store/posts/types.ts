export interface IPost {
    title: string
    [key: string]: any
}

export interface IPostsState {
    editorPost: IPost | null
    govils: any[]
    news: any[]
    agendas: any[]
    googleNews: any[]
    committees: any[]
    plenums: any[]
    queries: any[]
    bills: any[]
    releases: any[]
    govStatistics: any[]
}