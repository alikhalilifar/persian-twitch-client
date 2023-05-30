import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Layout, Streamers, StreamerSingle } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Streamers />} />
          <Route path=":streamer" element={<StreamerSingle />} />
        </Route>
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
