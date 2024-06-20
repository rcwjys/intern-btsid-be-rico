import { prisma } from '../utils/prismaClient.js';

export const tryCatch = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res, next); 
  } catch (err) {
    return next(err);
  }finally {
    await prisma.$disconnect();
  }
};
