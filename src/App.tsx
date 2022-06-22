import React, { useEffect } from "react";
import { EmailsPage, SignIn } from "./pages";
import { Routes, Route } from "react-router-dom";
import i18next from "i18next";
import {ws } from './api/WebSocket'


function App() {
  const pageDirection = i18next.dir();
  useEffect(() => {
    document.body.dir = pageDirection;
  }, [pageDirection]);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EmailsPage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
