const nodemailer = require("nodemailer");
require("dotenv").config();
const { NODE_MAILER_USER, NODE_MAILER_PASS } = process.env;

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${NODE_MAILER_USER}`, // Replace with your Gmail email
      pass: `${NODE_MAILER_PASS}`, // Replace with your Gmail password
    },
  });
};

const closeTransporter = () => {
  if (transporter) {
    transporter.close();
    console.log("Nodemailer cerrado");
  } else {
    console.log("Nodemailer transporter no inicializado");
  }
};

module.exports = {
  createTransporter,
  closeTransporter,
};
