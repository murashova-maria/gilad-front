import React from "react"

export interface IProps {
    onClick: (e: React.MouseEvent) => void
    disabled?: boolean
    className?: string
}