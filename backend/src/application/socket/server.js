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


async function handleJoinBoardEvent(socket, userId) {
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
    
    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occurred while joining the board');
    }
  });
}


async function handleCreateBoardEvent(socket) {

  socket.on('createList', async (data) => {
    const { listId } = data;

    try {
      const createdList = await prisma.list.findUnique({
        where: {
          list_id: listId
        }
      });

      const formattedResponse = {
        listId: createdList.list_id,
        listTitle: createdList.list_title
      }

      const { board_id } = createdList;

      io.to(board_id).emit('createdList', formattedResponse );

    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occured');
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
    const { taskId } = data;

    try {
      const updatedTask = await prisma.task.findUnique({
        where: {
          task_id: taskId
        },
        include: {
          lists: {
            select: {
              list_id: true
            },
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

      const formattedResponse = {
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

  handleJoinBoardEvent(socket, userId);

  handleCreateBoardEvent(socket);

  handleCreateTask(socket);

  handleUpdateTask(socket);

});

