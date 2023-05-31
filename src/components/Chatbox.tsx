import tmi from "tmi.js";
import { useEffect, useState } from "react";
import { EmoteObject } from "../types/types";
import reactStringReplace from "react-string-replace";

export const Chatbox = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState<
    {
      username: string;
      color: string;
      message: string;
    }[]
  >();
  const [emoteList, setEmoteList] = useState<
    {
      name: string;
      url: string;
      width: number;
      height: number;
    }[]
  >();

  useEffect(() => {
    if (!id) {
      return;
    }

    const client = new tmi.Client({
      channels: [id as string],
      connection: {
        server: "tw-chat-rly.fly.dev",
        port: 443,
        secure: true,
      },
    });

    client.connect();

    client.on("message", (channel: any, tags: any, message: any, self: any) => {
      const username = `${tags["display-name"]}`;
      setMessages((messages: any) => [
        {
          username,
          color: tags?.color,
          message,
        },
        ...(messages || []),
      ]);
    });

    return () => {
      client.disconnect();
    };
  }, [id]);

  useEffect(() => {
    setMessages([]);

    const get7tvEmotes = async () => {
      const response = await fetch(`https://7tv.io/v3/users/twitch/21841789`);
      const data = await response.json();
      if (!data) return;
      const emotes = data?.emote_set?.emotes || [];
      if (!emotes) return;
      const emoteIndex = 2;
      const emoteList = emotes?.map((emote: EmoteObject) => {
        return {
          name: emote?.name,
          url: `https:${emote?.data?.host?.url}/${emote?.data?.host?.files?.[emoteIndex]?.name}`,
          width: emote?.data?.host?.files?.[emoteIndex]?.width / 2,
          height: emote?.data?.host?.files?.[emoteIndex]?.height / 2,
        };
      });
      console.log(emoteList);
      setEmoteList(emoteList);
    };

    get7tvEmotes();
  }, [id]);

  const messageProcessor = (msg: string) => {
    if (!msg) return;
    if (!emoteList) return;
    let message: any = msg;
    // check if emote exists in emoteList
    message.split(" ").forEach((word: string) => {
      const hasEmote = emoteList?.some((emote: any) => emote?.name === word);
      if (hasEmote) {
        const emoteAsset = emoteList?.find(
          (emote: any) => emote?.name === word
        );
        message = reactStringReplace(message, word, (match, i) => (
          <img
            key={i}
            src={emoteAsset?.url}
            alt={word}
            style={{
              width: `${emoteAsset?.width}px`,
              height: `${emoteAsset?.height}px`,
            }}
          />
        ));
      }
    });
    return message;
  };

  return (
    <div
      className="flex basis-72 shrink-0 rounded-xl"
      style={{
        direction: "ltr",
      }}
    >
      {
        <div className="flex flex-col-reverse gap-4 text-sm w-full h-full p-4">
          {messages &&
            messages?.map((m, i) => (
              <div key={i} className="gap-4">
                <div className="gap-1 text-white flex flex-wrap">
                  <span
                    className="font-bold"
                    style={{
                      color: m?.color,
                    }}
                  >
                    {m?.username}:{" "}
                  </span>
                  <span className="flex gap-1 break-words">
                    {messageProcessor(m?.message)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  );
};