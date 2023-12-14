const { Router } = require("express");
const {
     createUser,
     getAllUsers,
     getUserById,
     updateUserById,
     deleteUserById
} = require("../controllers/userController");

const userValidationMiddleware = require("../middleware/userValidation")

const router = Router();

router.post("/user", userValidationMiddleware, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);
router.put("/user/:id", deleteUserById); // Use router.put for logical deletion

module.exports = router;
