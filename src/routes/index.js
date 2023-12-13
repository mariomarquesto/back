const { Router } = require("express");
const userRoutes = require("./userRoutes");
const parentsRoutes = require("./parentsRoutes");
const estudianteRoutes = require("./estudianteRoutes");


const router = Router();

router.use(userRoutes); // Full CRUD
router.use(estudianteRoutes)
router.use(parentsRoutes);

module.exports = router;
