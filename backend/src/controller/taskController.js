import { z } from "zod";
import { prisma } from "../utils/prismaClient.js";
import { ValidationError } from "../utils/error.js";

export async function createTask(req, res) {
  const taskSchema = z.object({
    taskTitle: z.string().min(1, 'task cannot be blank'),
    listId: z.string(),
    authorId: z.string()
  });

  const taskData = await taskSchema.parseAsync(req.body);


  const isTaskExists = prisma.task.findUnique({
    where: {
      task_title: taskData.taskTitle
    }
  });

  if (isTaskExists) {
    throw new ValidationError('task is already exists', 400);
  }

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
      user_id: taskData.authorId
    }
  });

  if (!isAuthorExists) {
    throw new ValidationError('author is not exists', 400);
  }


  const createdTask = await prisma.task.create({
    data: {
      task_title: taskData.taskTitle,
      list_id: taskData.listId,
      author_id: taskData.authorId
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