const { Router } = require("express");
const { newParentValidation } = require("../middleware/newParentValidation");
//const { newParentHandler } = require("../Handlers/createUserParent");
const { getAllParentsHandler } = require("../Handlers/getParentsHandler");
const { parentByIdHandler } = require("../Handlers/parentByIdHandler");
const { updateParentHandler } = require("../Handlers/updateParentHandler");
const { deleteParentHandler } = require("../Handlers/deleteParentHandler");
const { createParent } = require("../controllers/createParent");
const { getParentIdsByUserId } = require("../controllers/parentLookUp");
const parentsRoutes = Router();

parentsRoutes.post("/parents", newParentValidation, createParent);

parentsRoutes.get("/parents", getAllParentsHandler);

parentsRoutes.get("/parents/:id", parentByIdHandler);

parentsRoutes.get("/parentbyuser/:userId", getParentIdsByUserId);

parentsRoutes.put("/parents/:id", updateParentHandler);

parentsRoutes.put("/parents/delete/:id", deleteParentHandler);

module.exports = parentsRoutes;
