import React, { useEffect } from "react";
import { EmailsPage, SignIn } from "./pages";
import { Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ws } from "./api/WebSocket";
import { usePostsState } from "./store/posts/hooks";

function App() {
  const pageDirection = i18next.dir();
  useEffect(() => {
    document.body.dir = pageDirection;
  }, [pageDirection]);


  useEffect(() => {

    const apiCall = {
      event_type: "echo",
      data: "ping",
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      console.log(json);
    };

  }, []);

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
