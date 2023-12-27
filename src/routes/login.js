const  { Router } = require ("express");
const loginRouter = Router()

//creamos una ruta que nos sirve como callback route URL esto es una ruta a la cual se le va hacer una soliciut luego que completemos la autenticacion y recibimos la infor del usuario

loginRouter.get("/google", (req, res)=> res.send(req.user))
//para que se pueda loguear con google hay que hacer una peticion a la api de google para obtener el token y luego pas
module.exports = {loginRouter}
