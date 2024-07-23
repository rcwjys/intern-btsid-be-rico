import { ValidationError } from "zod-validation-error";
import { verifyToken } from "../utils/verifyToken.js";


export async function socketMiddleware(socket, next) {

  const token = socket.handshake.auth && socket.handshake.auth.token ? socket.handshake.auth.token : false;

  if (!token) {
    return next(new ValidationError('token is required to connect'));
  }

  try {
    const payload = await verifyToken(token);
    socket.userPayload = payload;

    return next();
  } catch (err) {
    console.log(err);
    socket.emit(err.message);

  }
}
