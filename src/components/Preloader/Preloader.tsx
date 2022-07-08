import styled, {keyframes} from "styled-components"

const Spin = keyframes`
    0%{
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Wrapper = styled.div`
    padding: 20px;
    text-align: center;
    & span {
        display: inline-block;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border-left: 3px solid #000;
        border-right: 3px solid transparent;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        animation: ${Spin} 1s linear infinite;

    }
`

const Preloader = () => {
    return <Wrapper><span></span></Wrapper>
}

export default Preloader