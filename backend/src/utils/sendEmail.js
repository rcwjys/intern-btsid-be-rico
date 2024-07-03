import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAILJET_API_KEY, 
    pass: process.env.MAILJET_SECRET_KEY, 
  },
  debug: true,
  connectionTimeout: 10 * 1000,
  greetingTimeout: 10 * 1000,   
  socketTimeout: 30 * 1000,     
});

export const createMailOptions = (from, to, subject, text, html) => {
  return {
    from,
    to,
    subject,
    text, 
    html
  }
}

export async function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err)
      resolve(info);
    })
  });
}
