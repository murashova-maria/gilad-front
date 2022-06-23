import React, { useEffect } from "react";
import { EmailsPage, SignIn, WithAuthHOC } from "./pages";
import { Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ws } from "./api/WebSocket";

function App() {
  const pageDirection = i18next.dir();
  useEffect(() => {
    document.body.dir = pageDirection;
  }, [pageDirection]);


  useEffect(() => {
    ws.addEventListener('message', (e: any) => {
      console.log('web socket data: ',JSON.parse(e.data))
    })
    ws.addEventListener('open', () => {
      console.log('web socket connected')
    })
    ws.addEventListener('error', (e) => {
      console.log('web socket closed with error:', e)
    })
    return () => {
      ws.close()
    }
  }, []);

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
