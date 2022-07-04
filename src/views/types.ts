import { FilterClient, node } from "../store/posts/types"
export interface IPostCard {
    onEmail: ()=> void
    onOpenModal: ()=> void
    item: any
    onSelectClient: (client: FilterClient) => void
    selectedClient: FilterClient | null
}

export interface IClientsEditor {
    onClose: () => void
}

export interface IKeywordEditor {
    onClose: () => void
}