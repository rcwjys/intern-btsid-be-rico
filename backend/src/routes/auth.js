import express from 'express';
import { login, logout, register } from '../controller/authController.js';
import { tryCatch } from '../utils/tryCatch.js';

const authRouter = express.Router();


/**
 * @swagger
 * /api/v1/users/register:
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
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password, returning user ID, name, and access token.
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
 *         description: User successfully logged in
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
 *                       example: "f9448035-2e75-42b6-851b-7a3016835c5e"
 *                     name:
 *                       type: string
 *                       example: "rico wijaya"
 *                     accessToken:
 *                       type: string
 *                       example: <token>
 */


authRouter.post('/api/v1/users/login', tryCatch(login));

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the user by verifying and invalidating the access token.
 *     responses:
 *       '200':
 *         description: User successfully logged out
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
 *                     message:
 *                       type: string
 *                       example: logout successfully
 *       '401':
 *         description: Unauthorized request
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
 *                       example: token is not exist
 */ 
authRouter.post('/api/v1/users/logout', tryCatch(logout));




export {authRouter};