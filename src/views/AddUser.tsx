import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { AddButton } from "../components/AddButton";
import { ButtonBox } from "../components/ButtonBox";
import { MainButton } from "../components/MainButton";
import { TextInput } from "../components/TextInput";
import { Title } from "../components/Title";

const Editor = styled.div<{ isLoading: boolean }>`
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
  background-color: #fff;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
  overflow: hidden;
  ${({ isLoading }) => isLoading && "& * {cursor: wait !important;"}
`;

const Content = styled.div`
  padding: 40px 30px 30px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`

const UserForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const Users = styled.div`
  height: 250px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const User = styled.p`
  margin-bottom: 8px;
  text-decoration: underline;
  color: ${colors.graphite_4};
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.65;
  }
`;

const StyledAction = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
`;

const StyledInput = styled(TextInput)`
  & input {
    padding: 8px 15px;
  }
  &:nth-child(2) {
    grid-column: span 2;
  }
`;

interface IProps {
  onClose: () => void;
}

const AddUser = ({ onClose }: IProps) => {
  const { t } = useTranslation();
  //inputs
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailPassword, setEmailPassword] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Editor isLoading={false}>
      <Content>
        <StyledTitle>{t("add-user_title1")}</StyledTitle>
        <UserForm onSubmit={(e) => handleSubmit(e)}>
          <StyledInput
            value={login}
            onChange={setLogin}
            label={t("add-user_login")}
          />
          <StyledInput
            value={password}
            onChange={setPassword}
            label={t("add-user_password")}
          />
          <StyledInput value={email} onChange={setEmail} label={t("add-user_email")} />
          <StyledInput
            value={emailPassword}
            onChange={setEmailPassword}
            label={t('add-user_email-password')}
          />
          <AddButton />
        </UserForm>
        <StyledTitle>{t('add-user_title2')}</StyledTitle>
        <StyledInput
          value={search}
          onChange={setSearch}
          label={t('add-user_search')}
          searchBtn={true}
        />
        <Users>
          <User>First</User>
          <User>First</User>
          <User>First</User>
          <User>First</User>
          <User>First</User>
          <User>First</User>
          <User>First</User>
          <User>First</User>
        </Users>
      </Content>
      <ButtonBox>
        <StyledAction onClick={() => console.log("save")} color="orange">
          {t("add-user_save")}
        </StyledAction>
        <StyledAction onClick={onClose} color="blue">
          {t("add-user_close")}
        </StyledAction>
      </ButtonBox>
    </Editor>
  );
};

export default AddUser;
