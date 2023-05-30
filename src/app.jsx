import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import { Layout, Streamers, StreamerSingle } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Streamers />} />
          <Route path=":streamer" element={<StreamerSingle />} />
          {/* <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
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
