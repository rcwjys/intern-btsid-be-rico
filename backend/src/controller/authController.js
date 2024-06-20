import { z } from 'zod';
import { UnAuthorize, ValidationError } from '../utils/error.js';
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

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
  });

  const credential = await loginSchema.parseAsync(req.body);

  const user = await prisma.user.findUnique({
    where: {
      user_email: credential.email,
    }
  });

  if (!user) {
    throw new UnAuthorize('email or username wrong', 401);
  }

  const isMatch = await bcrypt.compare(credential.password, user.user_password);

  if (!isMatch) {
    throw new UnAuthorize('email or username wrong', 401);
  }

  res.status(200).json({
    success: true, 
    data: {
      userId: user.user_id,
      name: user.user_name
    }
  });
}

export async function logout(req, res) {

}


