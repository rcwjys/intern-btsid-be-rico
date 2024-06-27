import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { NotFound, ValidationError } from "../utils/error.js";

export async function createTask(req, res) {
  const taskSchema = z.object({
    taskTitle: z.string().min(1, 'task cannot be blank'),
    listId: z.string().min(1)
  });

  const taskData = await taskSchema.parseAsync(req.body);



  const isListExists = await prisma.list.findUnique({
    where: {
      list_id: taskData.listId
    }
  });

  if (!isListExists) {
    throw new ValidationError('list is not exists',400);
  }

  const isAuthorExists = await prisma.user.findUnique({
    where: {
      user_id: req.userPayload.userId
    }
  });

  if (!isAuthorExists) {
    throw new ValidationError('author is not exists', 400);
  }


  const createdTask = await prisma.task.create({
    data: {
      task_title: taskData.taskTitle,
      list_id: taskData.listId,
      author_id: req.userPayload.userId,
    }
  });

  res.status(200).json({
    success: true,
    data: {
      taskTitle: createdTask.task_title,
      createdAt: createdTask.createdAt
    }
  });
}
