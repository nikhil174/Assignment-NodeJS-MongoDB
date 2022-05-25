const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getDetails,
  allUsers,
} = require("../conrollers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", protect, allUsers);
router.get("/:id", protect, getDetails);

module.exports = router;
