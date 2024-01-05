const { createTransporter } = require("../nodemail/transporter");
 
 const sendConfirmationEmailEstudiante = (userEmail) => {
     const transporter = createTransporter();
 
     const mailOptions = {
         from: 'ruukazu@gmail.com',
         to: userEmail,
         subject: 'Confirmacion de validacion de inscripcion del estudiante',
         text: 'Su estudiante se ha inscrito a la institucion correctamente'
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
    sendConfirmationEmailEstudiante,
};