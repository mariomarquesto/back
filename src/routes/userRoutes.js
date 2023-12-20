const { Router } = require("express");
const {
     createUser,
     getAllUsers,
     getUserById,
     updateUserById,
     deleteUserById
} = require("../controllers/userController");

// Auth  ---------
const { loginUser } = require("../controllers/Auth");
const { authenticateToken } = require("../controllers/authJWTCheck")
//   -----------------

const userValidationMiddleware = require("../middleware/userValidation")

const router = Router();

router.post("/user", userValidationMiddleware, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);
router.put("/userDel/:id", deleteUserById); // Use router.put for logical deletion

// Auth  ---------
router.post("/login", loginUser);
router.get('/authenticate', authenticateToken);
//   -----------------

module.exports = router;
