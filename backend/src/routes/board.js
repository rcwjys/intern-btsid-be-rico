import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createBoard } from '../controller/boardController.js';

const boaordRouter = express.Router();


boaordRouter.post('/api/v1/boards', tryCatch(createBoard));



export { boaordRouter };