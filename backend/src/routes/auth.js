import express from 'express';
import { login, logout, register } from '../controller/authController.js';
import { tryCatch } from '../utils/tryCatch.js';

const authRouter = express.Router();


 /**
 * @swagger
 * /api/v1/users/register:
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
 *         description: Bad request.
 *       200:
 *         description: user already exists
 */
authRouter.post('/api/v1/users/register', tryCatch(register));

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login to the application
 *     description: Endpoint to authenticate and login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       description: The ID of the logged-in user.
 *                     name:
 *                       type: string
 *                       description: The name of the logged-in user.
 *       401:
 *         description: Unauthorized. Invalid email or password.
 *       400:
 *         description: Bad request. Malformed request body.
 */

authRouter.post('/api/v1/users/login', tryCatch(login));


authRouter.post('/api/v1/users/logout', tryCatch(logout));




export {authRouter};