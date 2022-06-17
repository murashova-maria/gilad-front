import styled from "styled-components"
import {ITextInput} from './types'
import { colors } from "../../assets/styles/colors"

const Wrapper = styled.div``

const Label = styled.label`
margin-inline-start: 20px;
font-weight: normal;
font-size: 14px;
line-height: 17px;
color: ${colors.graphite_5};
`

const Input = styled.input`
    display: block;
    background: white;
    border: 1px solid #d0d9de;
    box-sizing: border-box;
    box-shadow: rgb(0 0 0 / 5%) 0px 4px 15px inset;
    border-radius: 125px;
    padding: 19px 20px;
    width: 100%;
    transition: all 0.25s ease 0s;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #455b66;
    margin-top: 5px;
`

const TextInput = ({value, onChange, placeholder, label, className}: ITextInput) => {
    return (
        <Wrapper className={className}>
            {label && <Label>{label}</Label>}
            <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type='text' />
        </Wrapper>
    )
}

export default TextInput
