import React, { useEffect } from "react";
import { EmailsPage, SignIn, WithAuthHOC } from "./pages";
import { Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ws } from "./api";
import { useUserActions, useUserState } from "./store/user/hooks";

function App() {
  const pageDirection = i18next.dir();
  const {token} = useUserState()
  useEffect(() => {
    document.body.dir = pageDirection;
  }, [pageDirection]);

  //Get User Info
  const {onGetUserInfo} = useUserActions()
  useEffect(() => {
    onGetUserInfo()
  }, [token])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WithAuthHOC><EmailsPage /></WithAuthHOC>} />
        <Route path="/sign-in" element={<WithAuthHOC><SignIn /></WithAuthHOC>} />
      </Routes>
    </div>
  );
}

export default App;
