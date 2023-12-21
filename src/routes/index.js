const { Router } = require("express");
const userRoutes = require("./userRoutes");
const parentsRoutes = require("./parentsRoutes");
const estudianteRoutes = require("./estudianteRoutes");
const adminRoutes = require("./adminRoutes");

const router = Router();

router.use(userRoutes); // Full CRUD
router.use(estudianteRoutes);
router.use(parentsRoutes);
router.use(adminRoutes);

module.exports = router;
