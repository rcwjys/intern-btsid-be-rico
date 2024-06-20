import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './src/swagger/swaggerOptions.js';

import express from 'express';
import dotenv from 'dotenv';
import { authRouter } from './src/routes/auth.js';
import { errorHandling } from './src/utils/errorHandling.js';
import { boaordRouter } from './src/routes/board.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRouter);

app.use(boaordRouter);

app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});

