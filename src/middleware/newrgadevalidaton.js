const Joi = require('joi');

const gradeValidate = (req, res, next) => {
    const schema = Joi.object({
        // id: Joi.string().uuid().required(),
        gradename: Joi.string().required(),
        gradequota: Joi.number().integer().required(),
        state: Joi.boolean().default(true),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.validatedData = value; // Almacena los datos validados en el objeto de solicitud para su uso posterior
    next();
};

module.exports = { gradeValidate };




//const { Grade } = require('../config/db');
// const { Op } = require('sequelize');

// const gradevalidate = async (req, res, next) => {
//     const { gradename, gradequota, state } = req.body;
//     if (!gradename || !gradequota || !state) {
//         return res.status(400).json({ msg: "Faltan datos" });
//     } else {
//         try {
//             // Convertir el nombre del grado del req.body a minúsculas
//             const lowercaseGradenameFromBody = gradename.toLowerCase();
//             // Obtener el nombre del grado de la base de datos y convertirlo a minúsculas
//             const existingGrade = await Grade.findOne({
//                 where: {
//                     gradename: {
//                         [Op.iLike]: lowercaseGradenameFromBody
//                     }
//                 }
//             });
//             if (existingGrade) {
//                 // Convertir el nombre del grado de la base de datos a minúsculas
//                 const lowercaseGradenameFromDB = existingGrade.gradename.toLowerCase();

//                 // Comparar los nombres de grado convertidos a minúsculas
//                 if (lowercaseGradenameFromBody === lowercaseGradenameFromDB) {
//                     // Si el grado ya existe, devuelve un mensaje de error
//                     return res.status(400).json(`El grado ${gradename} ya existe y no se puede crear.`);
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(`Error al validar el grado ${gradename}`);
//         }
//     }
//     next();
// };

// module.exports = { gradevalidate };