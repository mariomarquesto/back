const nodemailer = require('nodemailer');

const createTransporter = () => {
     return nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'ruukazu@gmail.com', // Replace with your Gmail email
             pass: 'awvq fcge vrvu yqeh' // Replace with your Gmail password
         }
     });
 };
 const closeTransporter = () => {
    if (transporter) {
      transporter.close();
      console.log('Nodemailer cerrado');
    } else {
      console.log('Nodemailer transporter no inicializado');
    }
  };

 module.exports = {
    createTransporter,
    closeTransporter
};