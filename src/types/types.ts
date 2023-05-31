export type StreamUrls = [
  {
    quality: "720p60 (source)";
    resolution: "1280x720";
    url: string;
  },
  {
    quality: "720p60";
    resolution: "1280x720";
    url: string;
  },
  {
    quality: "480p";
    resolution: "852x480";
    url: string;
  },
  {
    quality: "360p";
    resolution: "640x360";
    url: string;
  },
  {
    quality: "160p";
    resolution: "284x160";
    url: string;
  },
  {
    quality: "audio_only";
    resolution: null;
    url: string;
  }
];

export type EmoteObject = {
  actor_id: null;
  flags: number;
  id: string;
  name: string;
  data: {
    animated: boolean;
    host: {
      url: string;
      files: {
        name: string;
        static_name: string;
        width: number;
        height: number;
      }[];
    };
  };
  timestamp: number;
};
