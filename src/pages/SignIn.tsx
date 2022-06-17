import { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { MainButton } from "../components/MainButton";
import { TextInput } from "../components/TextInput";
import { ILoginData } from "./types";

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
  const [loginData, setLoginData]: [ILoginData, any] = useState({
    login: "",
    password: "",
  });

  return (
    <SignInPage>
      <div>
        <Title>Sign in</Title>
        <Box>
          <StyledInput
            placeholder="Login"
            value={loginData.login}
            onChange={(e) =>
              setLoginData((prev: ILoginData) => ({ ...prev, login: e }))
            }
            label="Log in"
          />
          <StyledInput
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev: ILoginData) => ({ ...prev, password: e }))
            }
            label="Password"
          />
          <StyledBtn
            color="orange"
            disabled={!loginData.login || !loginData.password}
          >
            Sign In
          </StyledBtn>
        </Box>
      </div>
    </SignInPage>
  );
};

export default SignIn;
