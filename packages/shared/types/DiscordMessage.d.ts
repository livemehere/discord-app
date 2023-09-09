export type Channel = {
  id: number;
  name: string;
  description: string;
  subChannels: SubChannel[];
  createdAt: number;
};

export type SubChannel = {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: number;
};
