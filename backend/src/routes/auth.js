import express from 'express';
import { forgotPassword, login, logout, register, validateForgotPassword } from '../controller/authController.js';
import { tryCatch } from '../utils/tryCatch.js';

const authRouter = express.Router();


/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with email, name, password, and password confirmation.
 *     tags: [Auth]
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
 *     tags: [Auth]
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
 *     tags: [Auth]
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
/**
 * @swagger
 * /api/v1/users/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email to the user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       '204':
 *         description: Password reset email sent successfully
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
 *                       example: user is not exists
 *       '500':
 *         description: Internal server error
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
 *                       example: something went wrong while send the email
 */


authRouter.post('/api/v1/users/forgot-password', tryCatch(forgotPassword));

/**
 * @swagger
 * /api/v1/users/reset-password/{token}:
 *   post:
 *     summary: Validate password reset
 *     description: Resets the user's password using the provided reset token.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newPassword123
 *               newPasswordConfirmation:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       '204':
 *         description: Password reset successfully
 *       '400':
 *         description: Bad request
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
 *                       example: password is must same with password confirmation
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
 *                       example: request to change password is not exist
 */


authRouter.post('/api/v1/users/reset-password/:token', tryCatch(validateForgotPassword));




export {authRouter};