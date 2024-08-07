import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../swagger/swaggerOptions.js';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRouter } from '../../src/routes/auth.js';
import { errorHandling } from '../../src/utils/errorHandling.js';
import { boardRouter } from '../../src/routes/board.js';
import { listRouter } from '../../src/routes/list.js';
import { taskRouter } from '../../src/routes/task.js';
import { authenticateMiddleware } from '../../src/middleware/authenticate.js';
import { tryCatch } from '../../src/utils/tryCatch.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRouter);

app.use(tryCatch(authenticateMiddleware));

app.use(boardRouter);

app.use(listRouter);

app.use(taskRouter);

app.use(errorHandling);

export { app };