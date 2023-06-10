import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Vod } from "../types/types";
import { toast } from "react-hot-toast";
import { config } from "../config/config";
import { StreamerContext } from "../app";

export const Videos = () => {
  const { streamer, twitchId } = useParams<{
    streamer: string;
    twitchId: string;
  }>();
  const navigate = useNavigate();
  const [vods, setVods] = React.useState<Vod[]>();
  const [streamerInformation, setStreamerInformation] =
    useContext(StreamerContext);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  React.useEffect(() => {
    if (!twitchId) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://${config.api}/streamer/${twitchId}/playlist`
        );
        const data = await response.json();
        if (!data) return;
        if (!data.data.length) {
          throw new Error("NO_VIDEOS");
        }
        setVods(data.data);
      } catch (err) {
        console.error(err);
        if (err?.message === "NO_VIDEOS") {
          toast.error(
            `Unfortunately, there are no videos available for ${streamer}.`
          );
          navigate(-1);
        }
      }
    })();
  }, []);

  const setInformation = (information: Vod) => {
    window.scrollTo({
      top: 0,
    });
    setStreamerInformation(information);
  };

  return (
    <div className="p-8 pt-0">
      <Link
        className="text-white rounded-md py-3 flex items-center gap-1 cursor-pointer mt-2 mb-4"
        to={`/${streamer}/${twitchId}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
        Back to Stream
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-white capitalize">
        {streamer} Videos
      </h1>
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-12"
        style={{ direction: "ltr" }}
      >
        {!vods?.length &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <li className="rounded-2xl overflow-hidden" key={i}>
                <div>
                  <div className="relative z-100">
                    <div className="animate-pulse bg-zinc-500 h-[275px] w-full"></div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 pt-12 pb-8 bg-zinc-800 flex flex-col gap-4">
                      <div className="animate-pulse bg-zinc-700 h-10 w-1/2 rounded-full absolute -top-6"></div>
                      <div className="animate-pulse bg-zinc-600 h-3 w-1/2 rounded-full"></div>
                      <div className="animate-pulse bg-zinc-600 h-3 w-1/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}

        {vods &&
          vods.map((vod: Vod) => (
            <li
              className="bg-zinc-800 rounded-2xl overflow-hidden"
              key={vod.id}
            >
              <Link
                to={{
                  pathname: `${vod.id}`,
                }}
                onClick={() => setInformation(vod)}
              >
                <div>
                  <div className="relative z-100">
                    <div className="viewer px-2 py-1 absolute ml-3 mt-3 rounded-lg items-center gap-2 inline-flex bg-[#111827]/80">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_775_2030)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.24687 0L0.306244 2.40297V12.2238H3.64962V14H5.53021L7.30646 12.2238H10.0229L13.6795 8.56713V0H1.24687ZM12.4259 7.94062L10.3359 10.0297H6.99277L5.21653 11.8059V10.0297H2.39574V1.25344H12.4254V7.94062H12.4259ZM10.3359 3.65662V7.31325H9.08249V3.65662H10.3359ZM6.99256 3.65662V7.31325H5.73912V3.65662H6.99256Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_775_2030">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="text-white text-xs">{vod.view_count}</div>
                    </div>
                    <img
                      src={vod?.thumbnail_url
                        ?.replace("%{width}", "440")
                        .replace("%{height}", "248")}
                      alt={vod.user_name}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-left" style={{ direction: "ltr" }}>
                    <div className="flex ">
                      <div
                        className={`relative h-10 z-10 items-center gap-2 inline-flex -mt-10 ${
                          streamerInformation?.profileUrl ? "pr-4" : "px-4"
                        } shadow-lg mb-4 backdrop-blur-2xl rounded-full`}
                      >
                        {streamerInformation?.profileUrl && (
                          <img
                            src={streamerInformation?.profileUrl}
                            alt={vod?.user_name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}

                        <h3 className="text-white font-bold text-sm">
                          {vod?.user_name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-white font-medium break-all">
                        {vod.title?.length > 30
                          ? vod.title?.slice(0, 30) + "..." // 50 is the max length of the title
                          : vod.title}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
