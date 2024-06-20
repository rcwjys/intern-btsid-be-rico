import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './src/swagger/swaggerOptions.js';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './src/routes/auth.js';
import { errorHandling } from './src/utils/errorHandling.js';
import { boardRouter } from './src/routes/board.js';
import { listRouter } from './src/routes/list.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRouter);

app.use(boardRouter);

app.use(listRouter);

app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});

