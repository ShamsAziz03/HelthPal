const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserById,
  updateIsAnonymous,
  getAllUsers,
  deleteUser,
  logInUser
} = require("../controllers/userController");

// Route for updating user's isAnonymous preference
router.put("/updateIsAnonymous/:patientId", updateIsAnonymous);

// Route for getting a user by ID
router.get("/:userId", getUserById);

// Route for creating a new user
router.post("/", createUser);

// Route for getting all users
router.get("/", getAllUsers);

// Route for deleting a user by ID
router.delete("/:userId", deleteUser);

// Route for logging in a user
router.post("/login", logInUser);

module.exports = router;
