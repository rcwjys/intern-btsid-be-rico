import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { NotFound, ValidationError } from "../utils/error.js";


export async function createBoard(req, res) {

  const boardSchema = z.object({
    boardTitle: z.string().min(1, 'Board title cannot be blank'),
  });

  const boardData = await boardSchema.parseAsync(req.body);

  const isBoardExist = await prisma.board.findUnique({
    where: {
      board_title: boardData.boardTitle
    }
  });

  if (isBoardExist) {
    throw new ValidationError('Board is already exists', 200);
  }
 
  const isAuthorExists = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isAuthorExists) {
    throw new ValidationError('author is not exists', 400);
  }

  const createdBoard = await prisma.board.create({
    data: {
      board_title: boardData.boardTitle,
      author_id: req.userPayload.userId
    }
  });

  res.status(200).json({
    success: true,
    data: {
      boardId: createdBoard.board_id,
      boardTitle: createdBoard.board_title,
      createdAt: createdBoard.created_at
    }
  });
}

export async function getBoardData(req, res) {

  const boardDataSchema = z.object({
    userId: z.string().min(1, 'userId is required')
  });

  const userData = await boardDataSchema.parseAsync(req.body);

  const isValidUserId = await prisma.user.findUnique({
    where: {
      user_id: userData.userId
    }
  });

  if (!isValidUserId) {
    throw new NotFound('board is not found', 404);
  }

  const boards = await prisma.board.findMany({
    where: {
      author_id: isValidUserId.user_id
    },
    select: {
      board_id: true,
      board_title: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          user_id: true,
          user_name: true
        }
      }
    }
  });

  res.status(200).json({
    success: true,
    data: {
      boards
    }
  });
}