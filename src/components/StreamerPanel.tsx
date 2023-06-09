import { useContext, useEffect, useState } from "react";
import {
  SteamerSocialMedia,
  StreamerBio,
  StreamerIcon,
  StreamerPanel as StreamerPanelType,
} from "../types/types";
import { config } from "../config/config";
import { Link } from "react-router-dom";
import { socialMediaIcons } from "../utils/socialMedia";
import { StreamerContext } from "../app";

export const StreamerPanel = ({ id }: { id: string }) => {
  const [panels, setPanels] = useState<{ data: StreamerPanelType }>();
  const [streamerBio, setStreamerBio] = useState<{ data: StreamerBio }>();
  const [streamer] = useContext(StreamerContext);
  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://${config.api}/streamer/${id}/panels`
        );
        const [data] = await response.json();
        const bioResponse = await fetch(
          `https://${config.api}/streamer/${data.data.user.login}/bio`
        );
        const [bioData] = await bioResponse.json();
        if (!data || !bioData) return;
        setPanels(data);
        setStreamerBio(bioData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return (
    <div>
      <div className="bg-black bg-opacity-60">
        <div className="max-w-5xl mx-auto px-8 py-5">
          {streamerBio?.data?.user && (
            <div>
              <div className="flex items-center mb-5">
                <div className="flex">
                  <div
                    className={`w-16 h-16 p-0.5 border-2 border-solid rounded-full relative`}
                    style={{
                      borderColor: `#${streamerBio.data.user.primaryColorHex}`,
                    }}
                  >
                    <img
                      className="rounded-full"
                      src={streamerBio.data.user.profileImageURL}
                      alt={streamerBio.data.user.displayName}
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-1 bg-red-600 text-sm text-white font-bold rounded">
                      LIVE
                    </span>
                  </div>
                  <div className="ml-2 flex flex-col justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <h1 className="text-lg font-bold text-white ">
                          {streamerBio.data.user.displayName}
                        </h1>
                        {streamerBio.data.user.isPartner && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            aria-label="Verified Partner"
                            className="fill-[#bf94ff] ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.5 3.5 8 2 3.5 3.5 2 8l1.5 4.5L8 14l4.5-1.5L14 8l-1.5-4.5ZM7 11l4.5-4.5L10 5 7 8 5.5 6.5 4 8l3 3Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <Link
                        to="/vod"
                        className="text-sm text-slate-400 hover:underline ml-4"
                      >
                        Videos
                      </Link>
                    </div>
                    <p className="font-bold text-sm text-white">
                      {streamer && streamer.title}
                    </p>
                    <h6 className="font-semibold text-violet-500 text-sm">
                      {streamer && streamer.gameName}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-800 p-7 flex justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <h5 className="font-bold text-white text-lg">
                      About {streamerBio.data.user.displayName}
                    </h5>
                    {streamerBio.data.user.isPartner && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        aria-label="Verified Partner"
                        className="fill-[#bf94ff] ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.5 3.5 8 2 3.5 3.5 2 8l1.5 4.5L8 14l4.5-1.5L14 8l-1.5-4.5ZM7 11l4.5-4.5L10 5 7 8 5.5 6.5 4 8l3 3Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex mb-1">
                    <span className="text-base font-semibold text-[#efeff1]">
                      {(
                        streamerBio.data.user.followers.totalCount / 1000
                      ).toLocaleString("en-US", {
                        style: "decimal",
                        maximumFractionDigits: 1,
                      })}
                      K
                    </span>
                    <p className="text-base text-gray-400 text-normal ml-2">
                      followers
                    </p>
                    {streamerBio.data.user.primaryTeam && (
                      <h6 className="font-semibold text-base text-violet-500 ml-2">
                        {streamerBio.data.user.primaryTeam.displayName}
                      </h6>
                    )}
                  </div>
                  <div>
                    <p className="text-white">
                      {streamerBio.data.user.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {streamerBio.data.user.channel.socialMedias.map(
                    (socialMedia: SteamerSocialMedia) => {
                      const matchingIconObj = socialMediaIcons.find(
                        (iconObj: StreamerIcon) =>
                          iconObj.title === socialMedia.name
                      );
                      const iconToDisplay = matchingIconObj
                        ? matchingIconObj.icon
                        : socialMediaIcons[socialMediaIcons.length - 1].icon;
                      return (
                        <a
                          key={socialMedia.id}
                          href={socialMedia.url}
                          target="_blank"
                          className="flex items-center mb-2 group [&:svg]:hover:fill-violet-500"
                        >
                          {iconToDisplay}
                          <p className="ml-1 text-[#adadb8] group-hover:text-violet-500">
                            {socialMedia.title}
                          </p>
                          <svg
                            width="1.2rem"
                            height="1.2rem"
                            viewBox="0 0 20 20"
                            aria-label="External social media link"
                            fill="#adadb8"
                            className="invisible group-hover:visible ml-1"
                          >
                            <path d="M6 8h5.293L5 14.293l1.414 1.414 6.293-6.293V15h2V6H6v2z"></path>
                          </svg>
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-8 max-w-5xl mx-auto pt-8">
        {panels?.data?.user?.panels.map((panel, i) => {
          if (panel?.__typename !== "DefaultPanel") return;
          return (
            <div key={i} className="flex flex-col gap-2">
              <div className="text-white text-xl font-bold">{panel.title}</div>
              <a
                href={panel.linkURL}
                target="_blank"
                className="flex justify-center"
              >
                <img
                  src={`https://${config.api}/panel-images/${encodeURIComponent(
                    panel.imageURL
                  )}`}
                  alt={panel.title}
                  className="w-full"
                />
              </a>
              <div className="text-white text-sm">{panel.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
