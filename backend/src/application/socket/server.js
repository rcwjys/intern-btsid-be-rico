import { Server } from 'socket.io';
import { createServer } from 'http';
import { app } from '../web.js';
import { socketMiddleware } from '../../middleware/socket.js';
import { prisma } from '../../utils/prismaClient.js';

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  },
});

io.use(socketMiddleware);


io.on('connection', async (socket) => {
  const userId = socket.userPayload?.user_id;

  socket.on('join-board', async (boardId) => {
    try {
      const board = await prisma.board.findUnique({
        where: { board_id: boardId }
      });

      if (!(board && board.is_sharing)) {
        return socket.emit('error', 'Board is not shared');
      }

      const isOwner = board.author_id === userId;

      const isCollaborator = await prisma.sharing.findFirst({
        where: {
          board_id: boardId,
          collaborator_id: userId
        }
      });

      if (!isOwner && !isCollaborator) {
        return socket.emit('error', 'Not authorized to join this board');
      }

      socket.join(boardId);
      
      socket.on('createList', async (data) => {
      
        const { listId } = data;

        try {
          const createdList = await prisma.list.findUnique({
            where: {
              list_id: listId
            }
          });

          io.to(boardId).emit('createdList', { createdList });

        } catch (err) {
          console.log(err);
          socket.emit('error', 'An error occured');
        }
      });

    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occurred while joining the board');
    }
  });
});

