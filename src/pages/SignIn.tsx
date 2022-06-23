import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { MainButton } from "../components/MainButton";
import { TextInput } from "../components/TextInput";
import { useTranslation } from "react-i18next";
import { useUserActions, useUserState } from "../store/user/hooks";
import { ILoginType } from "../store/user/types";

const SignInPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Gilroy-B";
  color: ${colors.graphite_6};
  font-size: 36px;
  line-height: 45px;
  margin-bottom: 32px;
`;

const Box = styled.div`
  width: 500px;
  background: white;
  border: 1px solid #c2fffd;
  box-shadow: rgb(0 0 0 / 5%) 0px 8px 25px;
  border-radius: 20px;
  padding: 40px 60px;
`;

const StyledInput = styled(TextInput)`
  margin-bottom: 16px;
`;

const StyledBtn = styled(MainButton)`
  width: 100%;
  padding: 20px 40px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  margin: 5px 0; 
`

const SignIn = () => {
  const { t } = useTranslation()
  const {errorMessage} = useUserState()
  const {onLogin} = useUserActions()
  const [loginData, setLoginData]: [ILoginType, any] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onLogin(loginData)
  }

  return (
    <SignInPage>
      <form onSubmit={(e) => handleLogin(e)}>
        <Title>{t('sign-in_title')}</Title>
        <Box>
          <StyledInput
            placeholder={t('sign-in_login-placeholder')}
            value={loginData.username}
            onChange={(e) =>
              setLoginData((prev: ILoginType) => ({ ...prev, username: e }))
            }
            label={t('sign-in_login-label')}
          />
          <StyledInput
            placeholder={t('sign-in_password-placeholder')}
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev: ILoginType) => ({ ...prev, password: e }))
            }
            label={t('sign-in_password-label')}
          />
          <StyledBtn
            color="orange"
            disabled={!loginData.username || !loginData.password}
          >
            {t('sign-in_sign-in')}
          </StyledBtn>
          {errorMessage && <ErrorMessage>{t(errorMessage)}</ErrorMessage>}
        </Box>
      </form>
    </SignInPage>
  );
};

export default SignIn;
