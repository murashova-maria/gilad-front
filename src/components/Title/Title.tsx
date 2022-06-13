import styled from "styled-components";
import { colors } from "../../assets/styles/colors";
import { ITitleProps } from "./types";

const StyledTitle = styled.h1`
  text-align: center;
  font-family: "Gilroy-B";
  font-size: 36px;
  line-height: 45px;
  color: ${colors.graphite_6};
`;



const Title = (props:ITitleProps) => {
    return <StyledTitle className={props.className}>{props.children}</StyledTitle>
}

export default Title