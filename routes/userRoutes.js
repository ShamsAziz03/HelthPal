const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserById,
  updateIsAnonymous,
  getAllUsers,
  deleteUser,
  logInUser,
  registerUser,
} = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", logInUser);

router.put("/updateIsAnonymous/:patientId", authenticateToken, updateIsAnonymous);

router.get("/:userId", authenticateToken, getUserById);

router.post("/", authenticateToken, authorizeRole("admin"), createUser);

router.get("/", authenticateToken, authorizeRole("admin", "doctor"), getAllUsers);
router.delete("/:userId", authenticateToken, authorizeRole("admin"), deleteUser);

module.exports = router;
