const { Router } = require("express");
const userRoutes = require("./userRoutes");
<<<<<<< HEAD
const gradeRoutes = require ("./gradeRouter")
=======
const parentsRoutes = require("./parentsRoutes");
const estudianteRoutes = require("./estudianteRoutes");
>>>>>>> 14fecebcaa1d9b83769827adf012e4b1eb292634


const router = Router();

router.use(userRoutes); // Full CRUD
<<<<<<< HEAD
router.use(gradeRoutes); 
=======
router.use(estudianteRoutes)
router.use(parentsRoutes);
>>>>>>> 14fecebcaa1d9b83769827adf012e4b1eb292634

module.exports = router;
