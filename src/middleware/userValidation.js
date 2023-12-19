const Joi = require('joi');

const userValidationMiddleware = (req, res, next) => {
     const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,255}$/).required()
               .messages({
                    'string.pattern.base': 'Password must be 16-255 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
               }),
          type: Joi.string().valid('Parents', 'Admin', 'SuperAdmin').required(),
          nombre: Joi.string().pattern(/^[A-Za-z\s]{1,50}$/).required()
               .messages({
                    'string.pattern.base': 'Nombre should only contain text and have a maximum length of 50 characters.',
               }),
          apellidoPaterno: Joi.string().pattern(/^[A-Za-z\s]{1,50}$/).required()
               .messages({
                    'string.pattern.base': 'Nombre should only contain text and have a maximum length of 50 characters.',
               }),
          apellidoMaterno: Joi.string().pattern(/^[A-Za-z\s]{1,50}$/).required()
               .messages({
                    'string.pattern.base': 'Nombre should only contain text and have a maximum length of 50 characters.',
               }),
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
