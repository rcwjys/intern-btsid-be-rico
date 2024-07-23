import { ValidationError } from "zod-validation-error";
import { verifyToken } from "../utils/verifyToken.js";
import { prisma } from "../utils/prismaClient.js";

export async function socketMiddleware(socket, next) {

  const token = socket.handshake.auth && socket.handshake.auth.token ? socket.handshake.auth.token : false;

  if (!token) {
    return next(new ValidationError('token is required to connect'));
  }

  try {
    const payload = await verifyToken(token);
    socket.userPayload = payload;

    const sharedBoards = await prisma.sharing.findMany({
      where: { collaborator_id: payload.userId },
      select: { board_id: true }
    });

    sharedBoards.forEach(({ board_id }) => {
      socket.join(board_id);
      console.log(`${socket.id} joined to room ${board_id}}`);
    });

    return next();
  } catch (err) {
    console.log(err);
    socket.emit(err.message);
    return next(err);
  }
}
