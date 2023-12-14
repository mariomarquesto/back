const { Router } = require("express");
const userRoutes = require("./userRoutes");
const gradeRoutes = require ("./gradeRouter")


const router = Router();

router.use(userRoutes); // Full CRUD
router.use(gradeRoutes); 

module.exports = router;