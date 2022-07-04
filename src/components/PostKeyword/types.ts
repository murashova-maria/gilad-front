export interface IProps {
    children: string | JSX.Element
    onClick?: () => void
    onDelete?: () => void
    className?: string
}