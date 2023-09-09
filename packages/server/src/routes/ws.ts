import { FastifyPluginAsync } from "fastify";
import { Chat } from "../../../shared/types/DiscordMessage";

const getUserByToken = (token: string) => {
  return `ID:${token}`;
};

const wsRouter: FastifyPluginAsync = async (fastify) => {
  fastify.io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);

    // 1.userId 등록
    socket.on("login", (token: string) => {
      socket.data.userId = getUserByToken(token);
      console.log(`${socket.data.userId}님이 로그인하였습니다`);
    });

    // 2.특정 채널 참가
    socket.on("join", (rooms) => {
      socket.join(rooms);
      console.log(
        `${socket.id}(${socket.data.userId}) 유저가 room 에 참여하였습니다`,
      );
      console.log(socket.rooms);
    });

    // 2-2.특정 채널 떠나기
    socket.on("leave", (rooms) => {
      socket.leave(rooms);
      console.log(
        `${socket.data.userId}(${socket.data.userId}) 유저가 room 에서 떠났습니다`,
      );
      console.log(socket.rooms);
    });

    // 2-3.특정 채널에 참가한 소켓(유저)리스트
    socket.on("members", async (room) => {
      const sockets = await fastify.io.in(room).allSockets();
      console.log(`${room} 의 members 목록:`, sockets);
      socket.emit("members", sockets);
    });

    // 3.특정 room(디스코드채널) 으로 메세지 전송 (본인 포함)
    socket.on("message", (chat: Chat) => {
      const room = chat.subChannelId;
      console.log(`${room}에 메세지 전송`, chat);
      fastify.io.to(room).emit("message", chat);
    });

    // 4.연결을 해제하면 속해있던 room(디스코드채널)에 전송
    socket.on("disconnecting", (reason) => {
      console.log(`${socket.id}(${socket.data.userId}) disconnecting!`);
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit("user-left", {
            socketId: socket.id,
            userId: socket.data.userId,
          });
        }
      }
    });
  });
};

export default wsRouter;
