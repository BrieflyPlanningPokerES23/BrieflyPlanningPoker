import nodemailer from 'nodemailer';

interface Email {
  to: string;
  subject: string;
  message: string;
}

export default async function send(email: Email) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.FROM,
      pass: process.env.PASSWORD,
    },
  });

  const options = {
    from: process.env.FROM,
    to: email.to,
    subject: email.subject,
    text: email.message,
  };

  transporter.sendMail(options).catch((err) => {
    throw new Error(err.message);
  });
}
