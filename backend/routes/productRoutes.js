const express = require("express");
const {
  addProduct,
  getAllProducts,
} = require("../conrollers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, addProduct);
router.get("/all", protect, getAllProducts);

module.exports = router;
