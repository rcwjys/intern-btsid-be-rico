import { z } from 'zod';
import { ValidationError } from '../utils/error.js';
import { prisma } from '../utils/prismaClient.js';
import bcrypt from 'bcrypt';

export async function register(req, res) {

  const RegistrationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(4),
    passwordConfirmation: z.string()
  });

  const userData = await RegistrationSchema.parseAsync(req.body);
  
  if (req.body.password !== req.body.passwordConfirmation) {
    throw new ValidationError('Password and Password Confirmation Must Same', 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      user_email: userData.email
    }
  });

  if (user) {
    throw new ValidationError('Email is used, please use another email', 400);
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await prisma.user.create({
    data: {
      user_email: userData.email,
      user_name: userData.name,
      user_password: hashedPassword
    }
  });

  res.sendStatus(201);

}

export async function login(req, res) {

}

export async function logout(req, res) {

}


