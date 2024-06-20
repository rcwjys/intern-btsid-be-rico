import express from 'express';
import { login, register } from '../controller/authController.js';
import { tryCatch } from '../utils/tryCatch.js';

const authRouter = express.Router();


  /**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name: 
 *                 type: string
 *               password: 
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Something wromg with the input
 */

authRouter.post('/api/v1/register', tryCatch(register));

/**
 * @swagger
 * /api/v1/login:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: Successful response
 */

authRouter.post('/api/v1/login', login);




export {authRouter};