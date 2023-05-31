import * as React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export const Streamers = () => {
  const [streamers, setStreamers] = React.useState([]);

  const getStreamers = async () => {
    try {
      const data = await (window as any).electronAPI?.getStreamers();
      if (!data) return;
      setStreamers(data?.data);
    } catch (err) {
      console.error(err);
      console.log("Retrying in 10 seconds...");
      setTimeout(() => {
        getStreamers();
      }, 10000);
    }
  };

  React.useEffect(() => {
    let interval: any;

    (async () => {
      try {
        getStreamers();

        interval = setInterval(() => {
          getStreamers();
        }, 60000);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="p-8">
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-12"
        style={{ direction: "ltr" }}
      >
        {!streamers?.length &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <li
                className="rounded-2xl overflow-hidden shadow-paxit-1"
                key={i}
              >
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

        {streamers &&
          streamers.map((streamer) => (
            <li
              className="bg-zinc-800 rounded-2xl overflow-hidden shadow-paxit-1"
              key={streamer.displayName}
            >
              <Link to={`/${streamer.login}`} onClick={scrollToTop}>
                <div>
                  <div className="relative z-100">
                    {/* <a
                      href={`https://sub.dono.gg/${streamer?.login}`}
                      className="buy-subscription px-2 py-1 absolute right-0 mr-3 mt-3 rounded-lg items-center gap-2 inline-flex bg-[#111827]/80"
                    >
                      <div className="text-white text-xs">خرید اشتراک</div>
                    </a> */}

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

                      <div className="text-white text-xs">
                        {streamer.viewers}
                      </div>
                    </div>
                    <img
                      src={streamer?.thumbnailUrl
                        ?.replace("{width}", "440")
                        .replace("{height}", "248")}
                      alt={streamer?.displayName}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-left" style={{ direction: "ltr" }}>
                    <div className="flex ">
                      <div className="relative z-10 items-center gap-2 inline-flex -mt-10 pl-1 pr-4 shadow-lg mb-4 backdrop-blur-2xl rounded-full p-1">
                        <img
                          src={streamer?.profileUrl}
                          alt={streamer?.displayName}
                          className="w-10 h-10 rounded-full"
                        />

                        <h3 className="text-white font-bold text-sm">
                          {streamer.displayName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-white font-medium break-all">
                        {streamer.title?.length > 30
                          ? streamer.title?.slice(0, 30) + "..." // 50 is the max length of the title
                          : streamer.title}
                      </div>

                      <div className="text-sm text-zinc-400 flex items-center gap-2">
                        {streamer.gameName}
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
