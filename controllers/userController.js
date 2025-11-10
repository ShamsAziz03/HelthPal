const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("Creating user with data:", req.body);
    const userData = req.body;

    const newUser = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};
