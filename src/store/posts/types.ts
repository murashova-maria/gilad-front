export interface IPost {
    title: string
    [key: string]: any
}

export interface IPostsState {
    editorPost: IPost | null
    govils: IPost[]
    news: IPost[]
    agendas: IPost[]
    googleNews: IPost[]
    committees: IPost[]
    plenums: IPost[]
    queries: IPost[]
    bills: IPost[]
    releases: IPost[]
    govStatistics: IPost[]
    govilData: IPost[]
    newPosts: any[]

}