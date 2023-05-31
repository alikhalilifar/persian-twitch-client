import { useParams } from "react-router-dom";
import { Streamers } from "./Streamers";
import { useEffect, useRef, useState } from "react";
import { StreamUrls } from "../types/types";
import ReactHlsPlayer from "react-hls-player/dist";
import { Chatbox } from "./Chatbox";

export const StreamerSingle = () => {
  const { streamer, twitchId } = useParams<{
    streamer: string;
    twitchId: string;
  }>();
  const [streamUrls, setStreamUrls] = useState<StreamUrls>();
  const [selectedQuality, setSelectedQuality] = useState<number>(2);
  const [retrievedM3u8, setRetrievedM3u8] = useState<any>(null);

  const quality = ["۱۰۸۰", "۷۲۰", "۴۸۰", "۳۶۰", "۱۶۰", "فقط صدا"];

  useEffect(() => {
    if (!streamUrls) {
      return;
    }

    (async () => {
      setRetrievedM3u8(streamUrls[selectedQuality]?.url);
    })();
  }, [streamUrls, selectedQuality]);

  const playerRef = useRef<any>();

  useEffect(() => {
    if (!streamer) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://tw-rly.fly.dev/streamer/${streamer}`
        );
        const data = await response.json();
        if (!data) return;
        setStreamUrls(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [streamer]);

  return (
    <div className="scroll_enabled">
      <div className="h-[100vh] flex">
        <div className="bg-black">
          {retrievedM3u8 && (
            <ReactHlsPlayer
              src={retrievedM3u8}
              autoPlay={true}
              controls={true}
              className="h-[100vh] w-[calc(100vw-300px)]"
              playerRef={playerRef}
              hlsConfig={{
                startPosition: 10,
              }}
            />
          )}
        </div>
        <div className="bg-zinc-900 w-[300px] h-[100vh] flex justify-end overflow-y-auto">
          <Chatbox id={streamer} />
        </div>
      </div>
      <Streamers />
    </div>
  );
};
