import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { NotFound, ValidationError } from "../utils/error.js";


export async function createList(req, res) {
  const listSchema = z.object({
    listTitle: z.string().min(1, 'list name cannot be blank'),
    boardId: z.string(),
  });

  const listData = await listSchema.parseAsync(req.body);

  const list = await prisma.list.findFirst({
    where: {
      list_title: listData.listTitle,
      author_id: req.userPayload.userId,
      board_id: listData.boardId
    }
  });

  if (list) {
    throw new ValidationError('list is already exists', 400);
  }

  const isBoardExist = await prisma.board.findUnique({
    where: {
      board_id: listData.boardId
    }
  });

  if (!isBoardExist) {
    throw new ValidationError('board is not exists', 400)
  }

  const isUserExists = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isUserExists) {
    throw new ValidationError('user is not exists', 400)
  }

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
  const slug = req.params.slug;

  const board = await prisma.board.findUnique({
    where: {
      board_slug: slug
    }
  });

  if (!board) {
    throw new ValidationError('board is not found', 400);
  }

  const lists = await prisma.list.findMany({
    where: {
      board_id: board.board_id
    },
    select: {
      list_id: true,
      list_title: true,
      tasks: {
        select: {
          task_id: true,
          task_title: true
        }
      }
    }
  });

  const formattedListResponse = lists.map(list => {
    return {
      listId: list.list_id,
      listTitle: list.list_title,
      tasks: list.tasks.map(task => {
        return  {
          taskId: task.task_id,
          taskTitle: task.task_title,
        }
      })
    }
  });

  res.status(200).json({
    success: true,
    data: formattedListResponse
  })
}