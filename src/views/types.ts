import { node } from "../store/posts/types"
export interface IPostCard {
    onEmail: ()=> void
    node: node
    item: any
}