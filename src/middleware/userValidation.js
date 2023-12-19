const Joi = require("joi");

const userValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.string().valid("Parents", "Admin", "SuperAdmin").required(),
    nombre: Joi.string().required(),
    apellidoPaterno: Joi.string().required(),
    apellidoMaterno: Joi.string().required(),
    complete: Joi.boolean().default(false),
    validate: Joi.boolean().default(false),
    state: Joi.boolean().default(true),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedData = value; // Almacena los datos validados en el objeto de solicitud para su uso posterior
  next();
};

module.exports = userValidationMiddleware;
