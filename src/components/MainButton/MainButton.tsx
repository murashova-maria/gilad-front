import { IMainButton } from "./types";
import styled from "styled-components";

const Btn = styled.button`
  font-family: "Gilroy-B", sans-serif;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 12px 30px;
  background: #f06543;
  box-shadow: 0px 10px 20px rgba(240, 101, 67, 0.2);
  border-radius: 36px;
  border: 0;
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.8;
  }
`;

const CenteredBtn = styled(Btn)`
  display: block;
  margin: 0 auto;
`;

const WideBtn = styled(Btn)`
  min-width: 242px;
`;

const CenteredWide = styled(Btn)`
  display: block;
  margin: 0 auto;
  min-width: 242px;
`;

const MainButton = ({ children, centered, wide }: IMainButton) => {
  if (centered && wide) return <CenteredWide>{children}</CenteredWide>;
  if (centered) return <CenteredBtn>{children}</CenteredBtn>;
  if (wide) return <WideBtn>{children}</WideBtn>;
  return <Btn>{children}</Btn>;
};

export default MainButton;
