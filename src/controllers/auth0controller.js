require("dotenv").config();
const { User } = require('../config/db'); // cambiar ruta a la db.js nuestra
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // No se instala ya viene por defecto es nativo de Node.js
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt")
const saltRounds = 10; // Numero de rondas del hashing
const userAuth0Controller = {};
const { sendConfirmationEmail } = require("../notif/nodemail/RegistroNotifUser")

userAuth0Controller.loginOrSignup = async (req, res) => {
     try {
          const { email, given_name, family_name } = req.body
          let user = await User.findOne({ where: { email: email } });
          if (!user) {
               const temporaryPassword = crypto.randomBytes(10).toString('hex');
               const hasheadPassword = await bcrypt.hash(temporaryPassword, saltRounds)
               console.log("esta seria la constraseña aleatoria creada", hasheadPassword)
               user = await User.create({
                    email,
                    password: hasheadPassword,
                    nombre: given_name,
                    apellidoPaterno: family_name,
                    apellidoMaterno: family_name,
                    type: "Parents",
                    subtype: 2, // 1 cuando es creado manual y 2 cuando vienen por auth0 para pedirle luego que cambie su contraseña
               });
               sendConfirmationEmail(email)
               const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                    expiresIn: '3h'
               });
               const isNewUser = true
               return res.status(201).json({ message: 'Usuario creado con exito', token, isNewUser });
          }
          // Si el subtype es igual a 2 usuario creado por auth0 , iniciar sesión del usuario
          if (user.subtype === 2) {
               // Generar un token JWT para el usuario que ha iniciado sesión
               const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                    expiresIn: '3h'
               });
               console.log("Tocken enviado al front usuario registrado ya en bd", token)
               return res.status(200).json({ message: 'Inicio de sesión exitoso usando Auth0', token, user });
          }
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error controllador auth0' });
     }
};

module.exports = userAuth0Controller;


