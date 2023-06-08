import { Link, useParams } from "react-router-dom";
import { Streamers } from "./Streamers";
import { useEffect, useRef, useState } from "react";
import { StreamUrls } from "../types/types";
import ReactHlsPlayer from "react-hls-player/dist";
import { Chatbox } from "./Chatbox";
import { StreamerPanel } from "./StreamerPanel";
import { toast } from "react-hot-toast";
import { config } from "../config/config";

export const StreamerSingle = () => {
  const { streamer, twitchId } = useParams<{
    streamer: string;
    twitchId: string;
  }>();
  const [streamUrls, setStreamUrls] = useState<StreamUrls>();
  const [selectedQuality, setSelectedQuality] = useState<number>(2);
  const [retrievedM3u8, setRetrievedM3u8] = useState<string | null>(null);

  const quality = ["1080", "720", "480", "360", "160", "Sound"];

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
          `https://${config.api}/streamer/${streamer}`
        );
        const data = await response.json();
        if (!data) return;
        if (!data.length) {
          throw new Error("NO_STREAM");
        }
        setStreamUrls(data);
      } catch (err) {
        console.error(err);
        if (err?.message === "NO_STREAM") {
          toast.error(`${streamer} is not live!`);
        }
      }
    })();
  }, [streamer]);

  return (
    <div>
      <div className="h-[100vh] flex">
        <div className="bg-black group w-[calc(100%-300px)] relative">
          <div className="gap-2 mb-4 hidden group-hover:flex justify-between w-full absolute top-0 left-0 z-10 fadeIn p-4">
            <Link to="/">
              <div className="text-white rounded-md py-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                Back to Streamers
              </div>
            </Link>
            {retrievedM3u8 && (
              <div className="flex gap-2">
                {quality.map((q, i) => (
                  <button
                    className={`${
                      selectedQuality === i
                        ? "bg-white backdrop-blur-lg text-black"
                        : "border border-white text-white"
                    } rounded-md px-2 py-1`}
                    key={i}
                    onClick={() => {
                      setSelectedQuality(i);
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
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
      <div className="py-8">
        <StreamerPanel id={twitchId} />
      </div>
    </div>
  );
};
