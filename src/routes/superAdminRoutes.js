const { Router } = require("express");
const {
  getParentsActive,
  getParentsPending,
  parentDetail,
  approvedParent,
  admin,
  getStudentsActive,
  getStudentsPending,
  studentDetail,
  approvedStudent,
  getAllParents,
  allStudents,
} = require("../controllers/adminController");
const {
  reactPadre,
  reactEstudiante,
  desactAdmin,
  reactAdmin,
} = require("../controllers/superAdminCtrlExtras")

const { deleteEstudianteById } = require("../controllers/estudianteController");
const { allgrades, newgrade } = require("../controllers/gradeController");
const { deleteParentHandler } = require("../Handlers/deleteParentHandler");
const { getAllAdmins } = require("../controllers/superAdminCtrlExtras");

//
//

// agregar json con cursos? o agregarselo a los json ya existentes para la db
const superAdminRoutes = Router();

// TODOS LOS USERS TIPO ADMIN
superAdminRoutes.get("/SuperAdmin/admins", getAllAdmins);
// TODOS LOS PADRES
superAdminRoutes.get("/SuperAdmin/allParents", getAllParents);
// TODOS LOS ESTUDIANTES
superAdminRoutes.get("/SuperAdmin/allStudents", allStudents);
// TODOS LOS CURSOS
superAdminRoutes.get("/SuperAdmin/allGrades", allgrades);
//ADMIN ESPECIFICO POR ID
superAdminRoutes.get("/SuperAdmin/admin/:id", admin);

//RUTA CREAR CURSO.crear formulario en front
superAdminRoutes.post("/SuperAdmin/newGrade", newgrade);
// PADRES VERIFICADOS
superAdminRoutes.get("/SuperAdmin/parents-Active", getParentsActive);
// PADRES PENDIENTES DE APROBACION/VERIFICACION
superAdminRoutes.get("/SuperAdmin/parents-Pending", getParentsPending);
//DETALLE DE PADRE
superAdminRoutes.get("/SuperAdmin/parentDetail/:id", parentDetail);
// ACEPTAR PADRE
superAdminRoutes.put("/SuperAdmin/parentDetail/:id", approvedParent);
// INHABILITAR PADRE
superAdminRoutes.put("/SuperAdmin/parentDetail/:id", deleteParentHandler);
// ESTUDIANTES VERIFICADOS
superAdminRoutes.get("/SuperAdmin/students-Active", getStudentsActive);
// ESTUDIANTES PENDIENTES
superAdminRoutes.get("/SuperAdmin/students-Pending", getStudentsPending);
//DETALLE DE ESTUDIANTE
superAdminRoutes.get("/SuperAdmin/studentDetail/:id", studentDetail);
//ACEPTAR ESTUDIANTE
superAdminRoutes.put("/SuperAdmin/studentDetail/:id", approvedStudent);
//ELIMINAR ESTUDIANTE
superAdminRoutes.put("/SuperAdmin/studentDetail/:id", deleteEstudianteById);


// REHABILITAR PADRE
superAdminRoutes.put("/SuperAdmin/parentDetail/:id", reactPadre);
// REHABILITAR ESTUDIANTE
superAdminRoutes.put("/SuperAdmin/studentDetail/:id", reactEstudiante);
// ELIMINAR ADMIN
superAdminRoutes.put("/SuperAdmin/admin/:id", desactAdmin);
// REHABILITAR ADMIN
superAdminRoutes.put("/SuperAdmin/admin/:id", reactAdmin);

module.exports = superAdminRoutes;
