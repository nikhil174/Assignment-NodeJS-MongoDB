const User = require("../models/userModal");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//@desc         Register new User
//@route        POST /api/users
//@access       PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  // checking for all the required data
  if (!firstName || !lastName || !username || !password) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  //checking if the username is unique or not
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("Username already taken");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user
  const user = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc         Authenticate a user and Login
//@route        POST /api/users/login
//@access       PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // checking if both username and password are provided
  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  //finding the user in the database
  const user = await User.findOne({ username });

  // if user exists then checking if passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild username or password");
  }
});

//@desc         Get details of the logged in user.
//@route        GET /api/users/details
//@access       PRIVATE
const getDetails = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("You are not autherized");
  }

  const id = req.params.id;

  if (req.user.id !== id) {
    res.status(401);
    throw new Error("You are not autherized");
  }

  const user = await User.findOne({ _id: id });

  if (user) {
    res.status(200);
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc         Get all the users
//@route        GET /api/users/all
//@access       PRIVATE
const allUsers = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("You are not autherized");
  }
  let users = await User.find();
  const allUsers = users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  }));

  res.status(200).json(allUsers);
});

module.exports = {
  registerUser,
  loginUser,
  getDetails,
  allUsers,
};
