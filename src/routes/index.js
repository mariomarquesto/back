const { Router } = require("express");

const userRoutes = require("./userRoutes");
const parentsRoutes = require("./parentsRoutes");
const estudianteRoutes = require("./estudianteroutes");
const adminRoutes = require("./adminRoutes");
const gradeRouter = require("./gradeRouter");
const auth0router = require("./auth0");
const superAdminRoutes = require("./superAdminRoutes");

const router = Router();

router.use(userRoutes); // Full CRUD
router.use(estudianteRoutes);
router.use(parentsRoutes);
router.use(adminRoutes);
router.use(gradeRouter);
router.use(auth0router);
router.use(superAdminRoutes);

module.exports = router;
