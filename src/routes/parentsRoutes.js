const { Router } = require("express");
const { newParentValidation } = require("../middleware/newParentValidation");
const { newParentHandler } = require("../Handlers/createUserParent");
const { getAllParentsHandler } = require("../Handlers/getParentsHandler");
const { parentByIdHandler } = require("../Handlers/parentByIdHandler");
const { updateParentHandler } = require("../Handlers/updateParentHandler");
const { deleteParentHandler } = require("../Handlers/deleteParentHandler");

const parentsRoutes = Router();

parentsRoutes.post("/parents", newParentValidation, newParentHandler);

parentsRoutes.get("/parents", getAllParentsHandler);

parentsRoutes.get("/parents/:id", parentByIdHandler);

parentsRoutes.put("/parents/:id", updateParentHandler);

parentsRoutes.put("/parents/delete/:id", deleteParentHandler);

module.exports = parentsRoutes;
