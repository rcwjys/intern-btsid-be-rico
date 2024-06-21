import express from 'express';
import { login, logout, register } from '../controller/authController.js';
import { tryCatch } from '../utils/tryCatch.js';

const authRouter = express.Router();


/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with email, name, password, and password confirmation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 minLength: 4
 *               passwordConfirmation:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User successfully registered
 *       '400':
 *         description: Bad request due to validation error or existing user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Email is used, please use another email
 */


authRouter.post('/api/v1/users/register', tryCatch(register));

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user credentials (email and password) and generate a session token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated user
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
 *                       type: string
 *                     name:
 *                       type: string
 *       '401':
 *         description: Unauthorized due to incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Email or password is incorrect
 */
authRouter.post('/api/v1/users/login', tryCatch(login));


authRouter.post('/api/v1/users/logout', tryCatch(logout));




export {authRouter};