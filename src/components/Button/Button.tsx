import { IButton } from "./types";
import styled from "styled-components";
import email from "../../assets/svg/btn-email.svg";
import edit from "../../assets/svg/btn-edit.svg";
import { colors } from "../../assets/styles/colors";
import del from "../../assets/svg/btn-del.svg";
import { useTranslation } from "react-i18next";

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  line-height: 17px;
  padding: 5px 15px;
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.5;
  }
`;

const Pic = styled.img`
  height: 14px;
  width: 14px;
  object-fit: contain;
`;

const EmailBtn = styled(Btn)`
  border-color: ${colors.cyan_4};
  background-color: ${colors.cyan_4};
  color: #fff;
`;

const EditBtn = styled(Btn)`
  border-color: ${colors.orange_5};
  background-color: #fff;
  color: ${colors.orange_5};
`;

const DelBtn = styled(Btn)`
  border-color: ${colors.red};
  background-color: #fff;
  color: ${colors.red};
`;


const Button = ({ type, ...props  }: IButton) => {
  const {t} = useTranslation()
  switch (type) {
    case "email":
      return (
        <EmailBtn {...props}>
          {t('btn_email')} <Pic src={email} />
        </EmailBtn>
      );
    case "edit":
      return (
        <EditBtn {...props}>
          {t('btn_edit')} <Pic src={edit} />
        </EditBtn>
      );
    case "del":
      return (
        <DelBtn {...props}>
          {t('btn_delete')}
          <Pic src={del} />
        </DelBtn>
      );
  }
};

export default Button;
