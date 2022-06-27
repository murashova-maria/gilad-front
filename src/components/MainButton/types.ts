export interface IMainButton {
    color: 'orange' | 'blue'
    onClick: () => void
    disabled?: boolean
    children?: string
    className?: string
}