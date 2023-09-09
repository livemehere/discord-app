export function createDiscordMessage() {
  const user = {
    id: "11",
    name: "kong",
    profileURL: "",
    createdAt: Date.now(),
    description: "hello world",
    status: "online",
  };

  const channel = {
    id: "testID",
    name: "Channel1",
    type: "text",
    moderator: user,
  };

  const body = {
    id: "bodyID1",
    content: "hello test body",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
  };

  return {
    channel,
    body,
    user,
    children: [],
  };
}

export class OnlineManager {
  channels: {
    [channel: string]: { seq: number; userId: string }[];
  };
  constructor() {
    this.channels = {};
  }

  joinChannel(channel: string, user: { seq: number; userId: string }) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }

    if (this.channels[channel].find((u) => u.seq === user.seq)) return;

    this.channels[channel].push({ seq: user.seq, userId: user.userId });
  }

  leaveChannel(channel: string, seq: number) {
    this.channels[channel] = this.channels[channel].filter(
      (u) => u.seq !== seq,
    );
  }

  getUsers(channel: string) {
    return this.channels[channel];
  }
}
