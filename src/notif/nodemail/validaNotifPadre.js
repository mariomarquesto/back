const { createTransporter } = require("../nodemail/transporter");
 
 const sendConfirmationEmailPadre = (userEmail) => {
     const transporter = createTransporter();
 
     const mailOptions = {
         from: 'ruukazu@gmail.com',
         to: userEmail,
         subject: 'Confirmacion de validacion de padre',
         text: 'Su usuario como padre ha sido validado y puede interactuar con la plataforma'
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
    sendConfirmationEmailPadre,
};