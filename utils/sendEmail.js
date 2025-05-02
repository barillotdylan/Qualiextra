import nodemailer from 'nodemailer';

const sendEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `${process.env.FRONT_URL}/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Vérifiez votre email',
    html: `<a href="${url}">Cliquez ici pour vérifier votre email</a>`,
  });
};

export default sendEmail;
