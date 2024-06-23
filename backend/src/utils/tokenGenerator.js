import jwt from 'jsonwebtoken';


export async function genereateAccessToken(payload) {
  return new Promise((resolve, rejected) => {
    jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '5h'}, (err, accessToken) => {
      if (err) rejected(err);
      resolve(accessToken);
    });
  }); 
}

export async function genereateRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'}, (err, refreshToken) => {
      if (err) reject(err)
      resolve(refreshToken)
    });
  });
};



