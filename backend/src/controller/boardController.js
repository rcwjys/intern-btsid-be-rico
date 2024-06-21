import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { ValidationError } from "../utils/error.js";


export async function createBoard(req, res) {

  const boardSchema = z.object({
    boardTitle: z.string().min(1, 'Board title cannot be blank'),
    authorId: z.string()
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
      user_id: boardData.authorId
    }
  });

  if (!isAuthorExists) {
    throw new ValidationError('author is not exists', 400);
  }

  const createdBoard = await prisma.board.create({
    data: {
      board_title: boardData.boardTitle,
      author_id: boardData.authorId
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