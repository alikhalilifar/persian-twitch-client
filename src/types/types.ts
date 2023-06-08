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

export type TStreamer = {
  displayName: string;
  gameId: string;
  gameName: string;
  login: string;
  platform: string;
  profileUrl: string;
  streamId: string;
  thumbnailUrl: string;
  title: string;
  twitchId: string;
  uptime: number;
  viewers: number;
};

export type StreamerExtensionPanel = {
  id: string;
  type: "EXTENSION";
  slotID: string;
  __typename: "ExtensionPanel";
};

export type StreamerDefaultPanel = {
  id: string;
  type: "DEFAULT";
  slotID: string;
  title: string | null;
  imageURL: string | null;
  linkURL: string | null;
  description: string | null;
  __typename: "DefaultPanel";
};

export type StreamerPanel = {
  currentUser: string | null;
  user: {
    id: string;
    cheer: any;
    login: string;
    panels: (StreamerDefaultPanel | StreamerExtensionPanel)[];
  };
};

export type SteamerSocialMedia = {
  id: string;
  name: string;
  title: string;
  url: string;
};

export type SteamerVideos = {
  node: {
    id: string;
    game: {
      id: string;
      displayName: string;
    };
    status: string;
  };
};

export type StreamerBio = {
  user: {
    id: string;
    description: string;
    displayName: string;
    isPartner: boolean;
    primaryColorHex: string;
    profileImageURL: string;
    followers: {
      totalCount: number;
    };
    channel: {
      id: string;
      socialMedias: SteamerSocialMedia[];
    };
    lastBroadcast: {
      id: string;
      game: {
        id: string;
        displayName: string;
      };
    };
    primaryTeam: {
      id: string;
      name: string;
      displayName: string;
    };
    videos: {
      edges: SteamerVideos[];
    };
  };
};