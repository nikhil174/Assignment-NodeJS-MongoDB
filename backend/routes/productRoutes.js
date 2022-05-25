const express = require("express");
const {
  addProduct,
  getAllProducts,
  addProductCSV,
} = require("../conrollers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//@desc         add a product
//{name, description, quantity, price} given from req.body
router.post("/add", protect, addProduct);

//@desc         add products using .csv file
// edit product.csv file in the root directory to add products
router.post("/addcsv", protect, addProductCSV);

//@desc         to fetch the list of all products
router.get("/all", protect, getAllProducts);

module.exports = router;
