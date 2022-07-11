export interface IMainButton {
    color: 'orange' | 'blue' | 'transparent'
    onClick: () => void
    disabled?: boolean
    children?: string
    className?: string
    type?: 'button' | 'submit' | 'reset'
}