export interface IPost {
    [key: string]: any | null
}

export interface IEmail {
    subject: string
    html: string
    recipients_ids: Array<string | number>
    items: {
        [key: string] : number[]
    }
}

export interface IPostsState {
    editorPost: IPost | null
    newPostsAvailable: number
    govils: IPost[]
    news: IPost[]
    agendas: IPost[]
    googleNews: IPost[]
    committees: IPost[]
    plenums: IPost[]
    persons: IPost[]
    queries: IPost[]
    bills: IPost[]
    releases: IPost[]
    govStatistics: IPost[]
    govilData: IPost[]
    govilPdf: IPost[]
}

export interface IDeletePost {
    node: node
    postId: number
}

export type node = 
"news" |  "govil" |  "agendas" |  "google_news" |  "committee_session" |  "plenum_session" |  "query" |  "bill" |  "press_release" |  "gov_statisctics" |  "govil_data" |  "govil_pdf" 

export type FilterClient = {id: number ,client: string}