import { number, z } from 'zod';
import { UnAuthorize, ValidationError } from '../utils/error.js';
import { prisma } from '../utils/prismaClient.js';
import bcrypt from 'bcrypt';
import { generateResetToken, genereateAccessToken } from '../utils/tokenGenerator.js';
import { verifyToken } from '../utils/verifyToken.js';
import validator from "validator";
import { createMailOptions, sendEmail } from '../utils/sendEmail.js';

export async function register(req, res) {

  const RegistrationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(4),
    passwordConfirmation: z.string()
  });

  const userData = await RegistrationSchema.parseAsync(req.body);

  if (req.body.password !== req.body.passwordConfirmation) throw new ValidationError('Password and Password Confirmation Must Same', 400);
  

  const user = await prisma.user.findUnique({
    where: {
      user_email: userData.email
    }
  });

  if (user) throw new ValidationError('Email is used, please use another email', 400);

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

  if (!user) throw new UnAuthorize('email or username wrong', 401);

  const isMatch = await bcrypt.compare(credential.password, user.user_password);

  if (!isMatch) throw new UnAuthorize('email or username wrong', 401);

  const accessToken = await genereateAccessToken({
    userId: user.user_id,
    name: user.user_name,
  });

  res.status(200).json({
    success: true,
    data: {
      userId: user.user_id,
      name: user.user_name,
      accessToken
    }
  });
}

export async function logout(req, res) {
  const header = req.headers.authorization;

  if (!header) throw new UnAuthorize('token is not exist', 401);

  const token = header.split(' ')[1];

  if (!token) throw new UnAuthorize('token is not exist', 401);

  try {
    await verifyToken(token);
    res.status(200).json({
      success: true,
      data: {
        message: 'logout succesfuly'
      }
    });
  } catch (err) {
    throw err;
  }
}

export async function forgotPassword(req, res) {

  const requestSchema = z.object({
    userEmail: z.string().min(1).refine((email) => validator.isEmail(email))
  });

  const request = await requestSchema.parseAsync(req.body);


  const userWithExactEmail = await prisma.user.count({
    where: {
      user_email: request.userEmail
    }
  });

  const user = await prisma.user.findUnique({
    where: {
      user_email: request.userEmail
    }
  });

  if (!userWithExactEmail) throw new ValidationError('user is not exists', 401)

  const resetToken = await generateResetToken();

  const resetLink = `${process.env.BASE_URL}/users/reset-password/${resetToken}`;

  const mailOptions = createMailOptions(
    'wtefek@gmail.com',
    request.userEmail,
    'Reset Password',
    `You are receiving this email because a password reset request was received for your account. Please click on the following link to reset your password: ${resetLink}`,
    `<p>You are receiving this email because a password reset request was received for your account. Please click on the following link to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`
  );

  const isSuccess = await sendEmail(mailOptions); 

  if (isSuccess.response.split(' ')[1] !== 'OK') throw new ValidationError('something went wrong while send the email', 500);

  await prisma.resetPassword.create({
    data: {
      token_reset: resetToken,
      expiresAt: Date.now() + 20 * 60 * 1000,
      user_id: user.user_id
    }
  });

  res.sendStatus(204);
}

export async function validateForgotPassword(req, res) {

  const changePasswordSchema = z.object({
    newPassword: z.string().min(4),
    newPasswordConfirmation: z.string().min(4)
  });

  const request = await changePasswordSchema.parseAsync(req.body);
  
  if (!request.newPassword === request.newPasswordConfirmation) throw new ValidationError('password is must same with password confirmation', 400);
  
  const token = req.params.token;

  if (!token) throw new ValidationError('token is not exists', 400);

  const isTransactionWithExactToken = await prisma.resetPassword.findFirst({
    where: {
      token_reset: token,
        isUse: false
    }
  });

  if (!isTransactionWithExactToken) throw new ValidationError('request to change password is not exist', 401);

  if (Date.now() >= +isTransactionWithExactToken.expiresAt.toString()) throw new ValidationError('token reset is expired', 401);

  await prisma.user.update({
    where: {
      user_id: isTransactionWithExactToken.user_id
    },
    data: {
      user_password: await bcrypt.hash(request.newPassword, 10)
    }
  });

  await prisma.resetPassword.update({
    where: {
      id: isTransactionWithExactToken.id,
      isUse: false
    }, 
    data: {
      isUse: true
    }
  });

  res.sendStatus(204);
}
