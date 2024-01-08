require("dotenv").config();
const { User } = require('../config/db'); // cambiar ruta a la db.js nuestra
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // No se instala ya viene por defecto es nativo de Node.js
const { jwtSecret } = process.env; 
const bcrypt = require ("bcrypt")
const saltRounds = 10; // Numero de rondas del hashing
const userAuth0Controller = {};
const { sendConfirmationEmail } = require("../notif/nodemail/RegistroNotifUser")

userAuth0Controller.loginOrSignup = async (req, res) => {
    try {
  
        const { email, given_name, family_name } = req.body
        
        let user = await User.findOne({
             where: {
                email: email
            }   
        });

        // console.log("esto es user encontrado en la BD", user)
        // si no existe el usuario creamos uno nuevo
        if (!user) {
            //Generamos una clave temporal
            //const nuevo = false
            const temporaryPassword = crypto.randomBytes(10).toString('hex');
            //hasheamos la clave para encriptar mejor la clave
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
         
            // Generating a JWT token for the new user
            const token = jwt.sign({ userId: user.id }, jwtSecret, {
                expiresIn: '3h'
            });
            const isNewUser = true
            //console.log("Tocken creado y enviado al front", token)
            // enviamos el token y el usuario al front 
            return res.status(201).json({ message:'Usuario creado con exito', token, isNewUser});
        }
        // Si el subtype es igual a 2 usuario creado por auth0 , iniciar sesión del usuario
        if (user.subtype === 2) {
             // Generar un token JWT para el usuario que ha iniciado sesión
             const token = jwt.sign({ userId: user.id }, jwtSecret, {
                expiresIn: '3h'
            });
            console.log("Tocken enviado al front usuario registrado ya en bd", token)
            return res.status(200).json({ message: 'Inicio de sesión exitoso usando Auth0', token, user });
        }
        // // If user found but Auth0 ID is not set, update the Auth0 ID
        // else if (user.auth0Id === null) {
        //     user.valid = true;
        //     user.auth0Id = auth0Id;
        //     await user.save();
        //     // Generating a JWT token for the user after updating Auth0 ID
        //     const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
        //         expiresIn: '3h'
        //     });
        //     // Sending the token and user details as a response
        //     return res.status(200).json({ message: 'Auth0 ID added to existing user', token });
        // }
        // // If Auth0 IDs mismatch, send an error message
        // else {
        //     return res.status(400).json({ message: 'Mismatch in Auth0 ID' });
        // }
    } catch (error) {
        // In case of an error, send an error message as a response
        console.error(error); // Agregar esta línea
        return res.status(500).json({ message: 'Error controllador auth0'});
    }
};

module.exports = userAuth0Controller;


