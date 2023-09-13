export interface User {
  id: string;
  username: string;
  profileUrl: string | null;
  createdAt: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  channelImageUrl: any;
  createdAt: string;
  moderatorId: string;
  members: Member[];
  subChannels: SubChannel[];
}

export interface Member {
  userId: string;
  channelId: string;
}

export interface SubChannel {
  id: string;
  name: string;
  description: any;
  type: "TEXT" | "AUDIO_TEXT";
  createdAt: string;
  channelId: string;
}

export interface Chat {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: any;
  userId: string;
  subChannelId: string;
}
