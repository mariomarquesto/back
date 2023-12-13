const { Router } = require("express");
const userRoutes = require("./userRoutes");
const parentsRoutes = require("./parentsRoutes");

const router = Router();

router.use(userRoutes); // Full CRUD

router.use(parentsRoutes);

module.exports = router;
