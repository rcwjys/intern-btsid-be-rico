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

const userSocket = new Map();

async function handleJoinBoardEvent(socket, userId) {
  socket.on('join-board', async (boardData) => {
    const { boardId } = boardData.board;
    try {
      const board = await prisma.board.findUnique({
        where: { board_id: boardId },
        include: {
          share: true
        }
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

      for (const [userId, socketId] of userSocket) {
        if (board.share.forEach(share => {
          if (share.collaborator_id === userId) {
            io.to(socketId).emit('joinedBoard', boardData);
          }
        })) { 
          continue;
        }
      }

    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occurred while joining the board');
    }
  });
}

function handleCreateTask(socket) {
  socket.on('createTask', async (data) => {
    const { taskId } = data;

    try {
      const newTask = await prisma.task.findUnique({
        where: {
          task_id: taskId
        },
        include: {
          lists: {
            include: {
              boards: {
                select: {
                  board_id: true
                }
              }
            }
          }
        }
      });

      const formattedTaskResponse = {
        listId: newTask.list_id,
        taskId: newTask.task_id,
        taskTitle: newTask.task_title
      }

      io.to(newTask.lists.board_id).emit('createdTask', formattedTaskResponse);

    } catch (err) {
      console.log(err);
      socket.emit('error', err.message);
    }
  });
}

function handleUpdateTask(socket) {
  socket.on('updateTask', async (data) => {
    const { oldListId, taskId } = data;

    try {
      const updatedTask = await prisma.task.findUnique({
        where: {
          task_id: taskId
        },
        include: {
          lists: {
            select: {
              list_id: true,
              board_id: true
            },
          }
        }
      });

      const formattedResponse = {
        oldListId,
        newListId: updatedTask.list_id,
        taskId: updatedTask.task_id,
        taskTitle: updatedTask.task_title
      }

      io.to(updatedTask.lists.board_id).emit('updatedTask', formattedResponse);

    } catch (err) {
      console.log(err.message);
      socket.emit('error', err.message);
    }
  });
}

io.on('connection', async (socket) => {

  const userId = socket.userPayload.userId;

  userSocket.set(userId, socket.id);

  handleJoinBoardEvent(socket, userId);
  
  handleCreateTask(socket);
  
  handleUpdateTask(socket);
  
  socket.on('disconnect', () => {
    userSocket.delete(userId);
  })
});

