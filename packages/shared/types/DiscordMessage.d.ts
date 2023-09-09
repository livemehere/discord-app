export type Channel = {
  id: string;
  name: string;
  description: string;
  subChannels: SubChannel[];
  createdAt: number;
};

export type SubChannel = {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  userId: string;
  body: string;
  createdAt: number;
  subChannelId: string;
};
