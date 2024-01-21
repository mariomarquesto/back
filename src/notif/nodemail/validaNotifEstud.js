const { createTransporter } = require("../nodemail/transporter");
require("dotenv").config();
const { NODE_MAILER_USER } = process.env;

const sendConfirmationEmailEstudiante = (userEmail) => {
     const transporter = createTransporter();
     const mailOptions = {
          from: `EasySchool ${NODE_MAILER_USER}`,
          to: userEmail,
          subject: 'Confirmacion de validacion de inscripcion del estudiante',
          html: `
         <p>Estimado Padre de Familia,</p>
         
         <p>Le extendemos un cordial saludo.</p>
         
         <p>
             Le informamos que se ha validado la informacion del estudiante con exito.
         </p>
         
         <p>Atentamente,</p>
         <p>El equipo de EasySchool</p>
         
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7lASO96V-SoGbSwGyJpHoF1OTaycauf-LL-gBRW76MDaSXT0DJc_h7gYA8_aQRqcyAI&usqp=CAU" alt="EasySchool Image">
     `
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