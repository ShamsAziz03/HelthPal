const express = require("express");
const router = express.Router();
const { createUser, getUserById } = require("../controllers/userController");

// Route for getting a user by ID
router.get("/:userId", getUserById);

// Route for creating a new user
router.post("/", createUser);

module.exports = router;
