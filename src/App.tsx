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
  //Watching for posts WebSocket
  useEffect(() => {
    ws.addEventListener('message', (e: any) => {
      //console.log('web socket data: ',JSON.parse(e.data))
    })
    ws.addEventListener('open', () => {
      //console.log('web socket connected')
    })
    ws.addEventListener('error', (e) => {
      //console.log('web socket closed with error:', e)
    })
    return () => {
      //ws.close()
    }
  }, []);

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
