import { IMainButton } from "./types";
import { colors } from "../../assets/styles/colors";
import styled from "styled-components";

const Btn = styled.button`
  font-family: "Gilroy-B", sans-serif;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 12px 57px;
  border-radius: 36px;
  border: 0;
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #d0d9de;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const OrangeBtn = styled(Btn)`
  color: #ffffff;
  background: #f06543;
  box-shadow: 0px 10px 20px rgba(240, 101, 67, 0.2);
`;

const BlueBtn = styled(Btn)`
  background: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${colors.cyan_3};
  border: 2px solid ${colors.cyan_3};
  box-shadow: 0px 10px 20px rgba(${colors.cyan_3}, 0.2);
`;

const MainButton = ({ children, color, className, disabled }: IMainButton) => {
  if (color === "orange")
    return <OrangeBtn className={className} disabled={disabled}>{children}</OrangeBtn>;
  if (color === "blue")
    return <BlueBtn className={className} disabled={disabled}>{children}</BlueBtn>;
  return <Btn className={className} disabled={disabled}>{children}</Btn>;
};

export default MainButton;
