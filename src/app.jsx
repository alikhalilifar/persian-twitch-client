import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Layout, Streamers, StreamerSingle, Videos } from "./components";

export const StreamerContext = React.createContext();

const App = () => {
	const [streamer,setStreamer] = React.useState();
  return (
    <StreamerContext.Provider value={[streamer,setStreamer]}>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Streamers />} />
          <Route path=":streamer/:twitchId" element={<StreamerSingle />} />
					<Route path=":streamer/:twitchId/videos" element={<Videos />} />
					<Route path=":streamer/:twitchId/videos/:videoId" element={<StreamerSingle />} />
        </Route>
      </Routes>
    </StreamerContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
