const { Router } = require("express");
const userRoutes = require("./userRoutes");

const router = Router();

router.use(userRoutes); // Full CRUD

module.exports = router;