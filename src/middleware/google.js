const passport = require ("passport");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
const { config } = require("dotenv");
config();

//simulamos base de datos
const emails = ["25ingchourio@gmail.com"];

//console.log(emails)

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google",  // La URL de retorno a la que Google redirigirá al usuario después de la autenticación
    },
    function (accessToken, refreshToken, profile, done) {
      const response = emails.includes(profile.emails[0].value);  // nos decuelve un array 
      //console.log(response)
      // si existe el correo 
      if (response) {  // esta autenticado
        done(null, profile);
        console.log(`Si existe el correo Registrado ${profile.emails[0].value}`)
        console.log(`Si existe el correo Registrado ${profile._json.sub}`)
        console.log(profile)
      } else {
        // guardamos en la base de datos 
        emails.push(profile.emails[0].value); 
        done(null, profile); 
        console.log(`No existe el correo ${profile.emails[0].value}`)
        console.log(`No existe el Nombre ${profile.name.givenName}`)
        console.log(`No existe el Apellido ${profile.name.familyName}`)
        console.log(emails)
      }
    }
  )
);




//! esto es profile

// {
//   id: '101010101022563256',
//   displayName: 'Eric ch. ch',
//   name: { familyName: 'ch. ch', givenName: 'Eric' },
//   emails: [ { value: '25ingchourio@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/ACg8ocKtqardSI7k5kZLGu860W-Jf6Xoae6ZPsUyPZDpzdq9=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "101010101022563256",\n' +
//     '  "name": "Eric ch. ch",\n' +
//     '  "given_name": "Eric",\n' +
//     '  "family_name": "ch. ch",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocKtqardSI7k5kZLGu860W-Jf6Xoae6ZPsUyPZDpzdq9\\u003ds96-c",\n' +
//     '  "email": "25ingchourio@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "es"\n' +
//     '}',
//   _json: {
//     sub: '101010101022563256',
//     name: 'Eric ch. ch',
//     given_name: 'Eric',
//     family_name: 'ch. ch',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocKtqardSI7k5kZLGu860W-Jf6Xoae6ZPsUyPZDpzdq9=s96-c',
//     email: '25ingchourio@gmail.com',
//     email_verified: true,
//     locale: 'es'
//   }
// }