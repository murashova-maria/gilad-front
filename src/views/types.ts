import { node } from "../store/posts/types"
export interface IPostCard {
    onEmail: ()=> void
    onOpenModal: ()=> void
    item: any
}

export interface IClientsEditor {
    onClose: () => void
}

export interface IKeywordEditor {
    onClose: () => void
}