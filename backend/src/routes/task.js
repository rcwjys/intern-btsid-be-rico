import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createTask } from '../controller/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/api/v1/tasks', tryCatch(createTask));


export { taskRouter };

