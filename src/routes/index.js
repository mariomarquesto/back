const { Router } = require("express");
const userRoutes = require("./userRoutes");
const estudianteRoutes = require("./estudianteRoutes");


const router = Router();

router.use(userRoutes); // Full CRUD
router.use(estudianteRoutes)

module.exports = router;