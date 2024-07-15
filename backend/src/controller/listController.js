import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { NotFound, ValidationError } from "../utils/error.js";


export async function createList(req, res) {
  const listSchema = z.object({
    listTitle: z.string().min(1, 'list name cannot be blank'),
    boardId: z.string().min(1),
  });

  const listData = await listSchema.parseAsync(req.body);

  const list = await prisma.list.findFirst({
    where: {
      list_title: listData.listTitle,
      author_id: req.userPayload.userId,
      board_id: listData.boardId
    }
  });

  if (list) throw new ValidationError('list is already exists', 400);

  const isBoardExist = await prisma.board.findUnique({
    where: {
      board_id: listData.boardId
    }
  });

  if (!isBoardExist) throw new ValidationError('board is not exists', 400);
  

  const isUserExists = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isUserExists) throw new ValidationError('user is not exists', 400);
  

  const createdList = await prisma.list.create({
    data: {
      list_title: listData.listTitle,
      board_id: listData.boardId,
      author_id: isUserExists.user_id
    }
  });

  res.status(200).json({
    success: true,
    data: {
      listId: createdList.list_id,
      listTitle: createdList.list_title,
      createdAt: createdList.createdAt
    }
  });
}

export async function getListData(req, res) {
  
  const boardId = req.params.boardId;

  if (!boardId) throw new ValidationError("boardId parameter is required");

  const board = await prisma.board.findUnique({
    where: {
      board_id: boardId
    }
  });

  if (!board) throw new ValidationError('Board not found', 404);

  const lists = await prisma.list.findMany({
    where: {
      board_id: board.board_id
    },
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      list_id: true,
      list_title: true,
      tasks: {
        select: {
          task_id: true,
          task_title: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  const formattedListResponse = lists.map(list => ({
    listId: list.list_id,
    listTitle: list.list_title,
    tasks: list.tasks.map(task => ({
      taskId: task.task_id,
      taskTitle: task.task_title
    }))
  }));

  res.status(200).json({
    success: true,
    data: formattedListResponse
  });
}


export async function getSharedLists(req, res) {
  const slug = req.params.slug;

  if (!slug) throw new ValidationError("Slug parameter is required");
  
  const board = await prisma.board.findFirst({
    where: {
      board_slug: slug,
      is_sharing: true,
      share: {
        some: { collaborator_id: req.userPayload.userId }
      }
    },
    include: {
      author: true,
      share: {
        include: {
          collaborator: true,
        },
      },
    },
  });

  if (!board) throw new ValidationError('Shared board not found or user does not have access', 404);

  const lists = await prisma.list.findMany({
    where: {
      board_id: board.board_id,
    },
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      list_id: true,
      list_title: true,
      tasks: {
        select: {
          task_id: true,
          task_title: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  const formattedListResponse = lists.map(list => ({
    listId: list.list_id,
    listTitle: list.list_title,
    tasks: list.tasks.map(task => ({
      taskId: task.task_id,
      taskTitle: task.task_title
    }))
  }));

  res.status(200).json({
    success: true,
    data: formattedListResponse
  });
}

