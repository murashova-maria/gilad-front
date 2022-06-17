export interface ITextInput {
    onChange: (value: string)=> void
    value: string
    placeholder: string
    label?: string
    className?: string
}