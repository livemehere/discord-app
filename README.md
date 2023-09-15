# Discord Clone

## How to run on local

> You need to install node, yarn, docker and docker-compose

```bash
yarn client:start # build and preview client port 4000
yarn server:start # build with docker-compose and start docker-compose (server:80, mysql:3306, redis:6379)
yarn db:migration # prisma migrate to localhost:3306 mysql
```

## Structure

### Client

- framework: `react`
- state management: `zustand`, `react-query`
- style : `@emotion/react`, `@emotion/styled`, `framer-motion`

### Server

- framework: `nestjs`
- orm: `prisma`
- cache: `redis`
- database: `mysql`
- websocket: `socket.io`
- infra: `docker`, `docker-compose`

![structure.png](img%2Fstructure.png)


## Guide 

### 1.Login

only login with username

![1.login.png](img%2F1.login.png)

### 2. Create Own Channel or Join Channel

![2.create-channel.png](img%2F2.create-channel.png)

![4.discover-channel.png](img%2F4.discover-channel.png)

### 3. Start Chatting with others!

![3.start-chat.png](img%2F3.start-chat.png)

### 4. You can check online members

![5.check-online-members.png](img%2F5.check-online-members.png)

### 5. Start Voice Chatting

> Before start voice chatting, you need to set audio input device

![6.setting audio input.png](img%2F6.setting%20audio%20input.png)

![7.start-voice-chat.png](img%2F7.start-voice-chat.png)

### 6. And you can create other sub channels

![8.you-can-craete-other-subChannel.png](img%2F8.you-can-craete-other-subChannel.png)

