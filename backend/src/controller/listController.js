import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { ValidationError } from "../utils/error.js";


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
  const params = req.param.slug;
  console.log();
  res.send('ok');
}