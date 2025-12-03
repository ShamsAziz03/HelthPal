const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
  );
};
exports.generateToken = generateToken;

exports.registerUser = async (req, res) => {
  try {
    console.log("Registering user with data:", req.body);
    const userData = req.body;
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const newUser = await User.create(userData);
    const token = generateToken(newUser);
    delete newUser.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

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

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update patient isAnonymous preference
exports.updateIsAnonymous = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { isAnonymous } = req.body;
    const result = await User.updateIsAnonymous(patientId, isAnonymous);
    res.status(200).json({
      success: true,
      message: "Patient isAnonymous preference updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating isAnonymous preference",
      error: error.message,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await User.deleteById(userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

exports.logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await User.updateLastLogin(user.userId);

    const token = generateToken(user);

    delete user.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};