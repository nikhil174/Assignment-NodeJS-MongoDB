const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getDetails,
  allUsers,
} = require("../conrollers/userControllers");

const { protect } = require("../middleware/authMiddleware");

//@desc     register a new user
//{firstName, lastName, username, password} is required
router.post("/", registerUser);

//@desc     login to the account
//{username, password} is required
router.post("/login", loginUser);

//@desc     fetch the list of all users
router.get("/all", protect, allUsers);

//@desc     get the details of the loggedin user
router.get("/:id", protect, getDetails);

module.exports = router;
