import React, { useEffect } from "react";
import { EmailsPage, SignIn, WithAuthHOC } from "./pages";
import { Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ws } from "./api";
import { useUserActions, useUserState } from "./store/user/hooks";
import { useAppState } from "./store/app/hooks";
import styled from "styled-components";

const AppWrapper = styled.div<{isModalOpen: boolean}>`
  height: 100vh;
  ${({isModalOpen}) => isModalOpen ? 'overflow: hidden;' : null}
`

function App() {
  const pageDirection = i18next.dir();
  const {token} = useUserState()
  const {isModalOpen} = useAppState()
  useEffect(() => {
    document.body.dir = pageDirection;
  }, [pageDirection]);

  //Get User Info
  const {onGetUserInfo} = useUserActions()
  useEffect(() => {
    onGetUserInfo()
  }, [token])


  return (
    <AppWrapper isModalOpen={isModalOpen}>
      <Routes>
        <Route path="/" element={<WithAuthHOC><EmailsPage /></WithAuthHOC>} />
        <Route path="/sign-in" element={<WithAuthHOC><SignIn /></WithAuthHOC>} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
