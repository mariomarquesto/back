// const express = require("express");
// const router = require("./routes");
// const morgan = require("morgan");
// const cors = require("cors");

// //import express from "express";
// const  { loginRouter } =  "../src/routes/login.js";
// const passport = require ("passport");
// require("../src/middleware/google.js");

// const server = express();

// server.use(morgan("dev"));
// server.use(express.json());
// server.use(cors());

// //autenticacion 3eros
// server.use(express.json());
// server.use(passport.initialize());

// server.use(
//     "/auth",
//     passport.authenticate("auth-google", {
//       scope: [  //nivel del alance del usuario
//         "https://www.googleapis.com/auth/userinfo.profile",  // nos permite saber la informacion del usuario
//         "https://www.googleapis.com/auth/userinfo.email",  // nos permite ver la ruta de correo electronico
//       ],
//       session: false,
//     }),
//     loginRouter
//   );
//   //hasta aqui

// server.use(router);

// module.exports = server;

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const { loginRouter } = require("../src/routes/login.js");
const passport = require("passport");
require("../src/middleware/google.js");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// Autenticación de terceros
server.use(express.json());
server.use(passport.initialize());

server.use(
  "/auth",
  passport.authenticate("auth-google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  }),
  loginRouter
);
// Hasta aquí

server.use(router);

module.exports = server;