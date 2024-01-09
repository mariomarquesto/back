const { Router } = require("express");
const {
  createValoracion,
  getAllValoraciones,
  getValoracionById,
  updateValoracionById,
  deleteValoracionById,
} = require("../controllers/valoracionCtrl");

// const userValidationMiddleware = require("../middleware/userValidation");

const valoracionesRoutes = Router();

valoracionesRoutes.post("/valoracion", createValoracion);
valoracionesRoutes.get("/valoracion", getAllValoraciones);
valoracionesRoutes.get("/valoracion/:id", getValoracionById);
valoracionesRoutes.put("/valoracion/:id", updateValoracionById);
valoracionesRoutes.put("/valoracionDelete/:id", deleteValoracionById);

module.exports = valoracionesRoutes;

/*
{
  "easeOfUse": "facil",
  "satisfaction":5,
  "registrationProcess":"sencillo",
  "userInterface":"amigable",
  "features":"buenas",
  "recommendation":true,
  "additionalComments":"Excelente"
}
{
  "easeOfUse": "normal",
  "satisfaction":3,
  "registrationProcess":"sencillo",
  "userInterface":"bueno",
  "features":"normal",
  "recommendation":true,
  "additionalComments":"va queriendo"
}

*/
