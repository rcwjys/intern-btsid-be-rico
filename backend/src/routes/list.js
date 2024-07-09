import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createList, getListData, getSharedLists } from "../controller/listController.js";

const listRouter = express.Router();

/**
 * @swagger
 * /api/v1/lists/{slug}:
 *   get:
 *     summary: Get specific lists and tasks related to a board
 *     description: Retrieve specific lists and tasks related to a board using the slug parameter.
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug identifier for the list
 *     responses:
 *       '200':
 *         description: List retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listId:
 *                   type: string
 *                   description: The unique identifier for the list.
 *                   example: "1197c4cf-951e-4bec-841c-ba868f9120af"
 *                 listTitle:
 *                   type: string
 *                   description: The title of the list.
 *                   example: "finish"
 *                 tasks:
 *                   type: array
 *                   description: The tasks associated with the list.
 *                   items:
 *                     type: object
 *                     properties:
 *                       taskId:
 *                         type: string
 *                         description: The unique identifier for the task.
 *                         example: "95e1712e-5325-429c-97d7-23c3019ed422"
 *                       taskTitle:
 *                         type: string
 *                         description: The title of the task.
 *                         example: "mandi"
 *       '400':
 *         description: Bad request.
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
 *                       example: "Invalid slug provided"
 */


listRouter.get("/api/v1/lists/:slug", tryCatch(getListData));

/**
 * @swagger
 * /api/v1/lists:
 *   post:
 *     summary: Create a new list
 *     description: Endpoint to create a new list for a specific board.
 *     tags: [List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listTitle:
 *                 type: string
 *                 minLength: 1
 *                 example: To-Do
 *               boardId:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       '200':
 *         description: List created successfully.
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
 *                     listTitle:
 *                       type: string
 *                       description: The title of the created list.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the list was created.
 *       '400':
 *         description: Bad request.
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
 *                       example: "Validation error: list name cannot be blank"
 */
listRouter.post("/api/v1/lists", tryCatch(createList));

/**
 * @swagger
 * /api/v1/shared-boards/{slug}/lists:
 *   get:
 *     summary: Get lists in a shared board
 *     description: Retrieve lists and tasks within a shared board identified by its slug.
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the shared board
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lists retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       listId:
 *                         type: string
 *                         example: "7eac5459-cf19-41c3-a620-5dd134c285f2"
 *                       listTitle:
 *                         type: string
 *                         example: "To Do"
 *                       tasks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             taskId:
 *                               type: string
 *                               example: "b0da6cf3-3497-489f-a2d2-05d0a3d965d6"
 *                             taskTitle:
 *                               type: string
 *                               example: "Buy groceries"
 *       '400':
 *         description: Bad request due to validation error or resource not found
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
 *                       example: "Validation error: Invalid request parameters"
 *       '404':
 *         description: Shared board not found or user does not have access
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
 *                       example: "Shared board not found or user does not have access"
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
 *                       example: "Internal server error"
 */

listRouter.get("/api/v1/shared-boards/:slug/lists", tryCatch(getSharedLists));


export { listRouter };
