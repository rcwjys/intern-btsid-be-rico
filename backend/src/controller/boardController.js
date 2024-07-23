import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { NotFound, ValidationError } from "../utils/error.js";
import { slugFormatter } from "../utils/slugFormatter.js";


export async function createBoard(req, res) {

  const boardSchema = z.object({
    boardTitle: z.string().min(1, 'Board title cannot be blank'),
  });

  const boardData = await boardSchema.parseAsync(req.body);

  const isBoardExist = await prisma.board.findFirst({
    where: {
      board_title: boardData.boardTitle,
      author_id: req.userPayload.userId
    }
  });

  if (isBoardExist) throw new ValidationError('Board is already exists', 400);

  const isAuthorExists = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isAuthorExists) throw new ValidationError('author is not exists', 400);

  const createdBoard = await prisma.board.create({
    data: {
      board_title: boardData.boardTitle,
      author_id: req.userPayload.userId,
      board_slug: slugFormatter(boardData.boardTitle)
    }
  });

  res.status(200).json({
    success: true,
    data: {
      boardId: createdBoard.board_id,
      boardTitle: createdBoard.board_title,
      boardSlug: createdBoard.board_slug,
      createdAt: createdBoard.created_at
    }
  });
}

export async function getBoardData(req, res) {
  const isValidUserId = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isValidUserId) throw new NotFound('board is not found', 404);

  const boards = await prisma.board.findMany({
    where: {
      author_id: isValidUserId.user_id,
      is_sharing: false
    },
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      board_id: true,
      board_title: true,
      board_slug: true,
    }
  });

  const formattedBoardsResponse = boards.map(board => ({
    boardId: board.board_id,
    boardTitle: board.board_title,
    boardSlug: board.board_slug
  }));

  res.status(200).json({
    success: true,
    data: formattedBoardsResponse
  });
}

export async function shareBoard(req, res) {
  
  const boardId = req.params.boardId;

  if (!boardId) throw new ValidationError('Board is required', 400);

  const shareSchema = z.object({
    collaboratorEmail: z.string().min(1)
  });

  const request = await shareSchema.parseAsync(req.body);

  const collaboratorWithExactEmail = await prisma.user.findUnique({
    where: {
      user_email: request.collaboratorEmail
    }
  });

  if (!collaboratorWithExactEmail) throw new ValidationError('user is not found', 400);

  const boardWIllShared = await prisma.board.findUnique({
    where: {
      board_id: boardId
    },
    include: {
      author: true,
      share: {
        include: {
          collaborator: true
        }
      }
    }
  });

  if (!boardWIllShared) throw new ValidationError('board is not found', 400);

  if (collaboratorWithExactEmail.user_id === boardWIllShared.author_id) throw new ValidationError('board is cannot share with your account', 400);

  const isDoubleShared = await prisma.sharing.count({
    where: {
      collaborator_id: collaboratorWithExactEmail.user_id,
      board_id: boardWIllShared.board_id
    }
  });

  if (isDoubleShared) throw new ValidationError('board is shared already shared');

  await prisma.sharing.create({
    data: {
      author_id: req.userPayload.userId,
      board_id: boardWIllShared.board_id,
      collaborator_id: collaboratorWithExactEmail.user_id
    }
  });

  await prisma.board.updateMany({
    where: {
      board_slug: boardWIllShared.board_slug,
      author_id: req.userPayload.userId
    },
    data: {
      is_sharing: true
    }
  });

  const updatedBoard = await prisma.board.findUnique({
    where: {
      board_id: boardWIllShared.board_id
    },
    include: {
      author: true,
      share: {
        include: {
          collaborator: true
        }
      }
    }
  });

  const formattedResponse = {
    boardId: updatedBoard.board_id,
    boardTitle: updatedBoard.board_title,
    boardSlug: updatedBoard.board_slug,
    author: {
      userId: updatedBoard.author_id,
      userName: updatedBoard.author.user_name
    },
    collaborators: updatedBoard.share.map(share => ({
      userId: share.collaborator_id,
      userName: share.collaborator.user_name
    }))
  }

  res.status(200).json({
    success: true,
    data: {
      board: formattedResponse
    }
  });

  
}

export async function getSharingBoard(req, res) {
  const share = await prisma.sharing.findMany({
    where: {
      OR: [
        { author_id: req.userPayload.userId }, 
        { collaborator_id: req.userPayload.userId }, 
      ],
    },
    include: {
      board: {
        select: {
          board_id: true,
          board_title: true,
          board_slug: true,
          author: {
            select: {
              user_id: true,
              user_name: true,
            },
          },
        },
      },
      collaborator: {
        select: {
          user_id: true,
          user_name: true,
        },
      },
    },
  });

  const mergeBoards = (data) => {
    return data.reduce((acc, current) => {
      const existingBoard = acc.find(item => item.board.board_id === current.board.board_id);

      if (existingBoard) {
        if (!existingBoard.collaborators.some(collab => collab.user_id === current.collaborator.user_id)) {
          existingBoard.collaborators.push(current.collaborator);
        }
      } else {
        acc.push({
          board: current.board,
          collaborators: [current.collaborator],
        });
      }

      return acc;
    }, []);
  };

  const convertToCamelCase = (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    return Object.keys(obj).reduce((camelCaseObj, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
      camelCaseObj[camelCaseKey] = convertToCamelCase(obj[key]);
      return camelCaseObj;
    }, {});
  };

  const camelCaseResponse = mergeBoards(share).map(entry => ({
    board: convertToCamelCase(entry.board),
    collaborators: entry.collaborators.map(collab => convertToCamelCase(collab)),
  }));

  res.status(200).json({
    success: true,
    data: camelCaseResponse,
  });
}
