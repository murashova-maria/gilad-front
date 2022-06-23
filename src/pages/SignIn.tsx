import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { MainButton } from "../components/MainButton";
import { TextInput } from "../components/TextInput";
import { ILoginData } from "./types";
import { useTranslation } from "react-i18next";
import { useUserActions } from "../store/user/hooks";

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

const SignIn = () => {
  const { t } = useTranslation()
  const {onLogin} = useUserActions()
  const [loginData, setLoginData]: [ILoginData, any] = useState({
    login: "",
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
            value={loginData.login}
            onChange={(e) =>
              setLoginData((prev: ILoginData) => ({ ...prev, login: e }))
            }
            label={t('sign-in_login-label')}
          />
          <StyledInput
            placeholder={t('sign-in_password-placeholder')}
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev: ILoginData) => ({ ...prev, password: e }))
            }
            label={t('sign-in_password-label')}
          />
          <StyledBtn
            color="orange"
            disabled={!loginData.login || !loginData.password}
          >
            {t('sign-in_sign-in')}
          </StyledBtn>
        </Box>
      </form>
    </SignInPage>
  );
};

export default SignIn;
