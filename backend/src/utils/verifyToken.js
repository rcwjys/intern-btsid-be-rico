import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) reject(err);
      resolve(decode);
    });
  });
}


