import styled from "styled-components"
import { IProps } from "./types"
import bg from '../../assets/svg/add-plus.svg'
import { colors } from "../../assets/styles/colors"

const Btn = styled.button<{disabled: boolean | undefined}>`
position: relative; 
    height: 40px;
    width: 40px;
    padding: 12px;
    border-radius: 50%;
    background-color: ${colors.orange};
    border: 0;
    font-size: 0;
    box-shadow: 0px 10px 20px rgba(240, 101, 67, 0.2);
    cursor: pointer;
    transition: opacity 200ms linear;
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        height: 16px;
        width: 16px;
        background-image: url(${bg});
        background-size: contain;
        background-posiiton: center;
        background-repeat: no-repeat;
        transform: translate(-50%, -50%);
    }
    &:hover {
        opacity: .75;
    }
    ${({disabled}) => disabled && 'opacity: .5 !important;'}
`

const AddButton = ({onClick, disabled, className}: IProps) => {
    return (<Btn onClick={onClick} disabled={disabled} className={className}>ADD BUTTON</Btn>)
}

export default AddButton