import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class PostsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("post")
  listenForPosts(@MessageBody() data: string) {
    this.server.sockets.emit("post", data);
  }
}
