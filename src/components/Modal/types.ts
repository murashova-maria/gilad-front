import { JsxElement } from "typescript";

export interface IModal {
    show: boolean
    children: any
    onClose: ()=> void
}