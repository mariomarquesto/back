const nodemailer = require('nodemailer');
const { NODE_MAILER_USER, NODE_MAILER_PASS } = process.env;


const createTransporter = () => {
     return nodemailer.createTransport({
          service: 'gmail',
          auth: {
               user: `${NODE_MAILER_USER}`, // Replace with your Gmail email
               pass: `${NODE_MAILER_PASS}` // Replace with your Gmail password
          }
     });
};

const sendConfirmationEmail = (userEmail) => {
     const transporter = createTransporter();

     const mailOptions = {
          from: `${NODE_MAILER_USER}`,
          to: userEmail,
          subject: 'Confirmacion de registro de usuario',
          text: 'Gracias por registrarse en la aplicacion'
     };

     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.error('Error sending email:', error);
          } else {
               console.log('Email sent:', info.response);
          }
     });
};
module.exports = {
     sendConfirmationEmail,
};