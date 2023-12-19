const Joi = require('@hapi/joi');

const estudianteSchema = Joi.object({
  idDocumento: Joi.string().pattern(/^[0-9]{7,15}$/).required().label("ID Documento"),
  nombres: Joi.string().max(150).required().label("Nombres"),
  apellidoPat: Joi.string().max(50).required().label("Apellido Paterno"),
  apellidoMat: Joi.string().max(50).required().label("Apellido Materno"),
  Nacionalidad: Joi.string().max(100).required().label("Nacionalidad"),
  fechNac: Joi.date().max('now').required(),
  sexo: Joi.string().valid('M', 'F').required(),
  peso: Joi.number().positive().required(),
  estatura: Joi.number().positive().required(),
  alergias: Joi.string().max(300).required(),
  grupoSanguineo: Joi.string().required(),
  contactoEmerg: Joi.number().required(),
  fotoPerfil: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  fotoDocumento: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  state: Joi.boolean().allow(null),
});

const estudianteValidationMiddleware = (req, res, next) => {
  const { body } = req;

  const { error, value } = estudianteSchema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  req.validatedData = value; 
  next();
};

module.exports = estudianteValidationMiddleware;