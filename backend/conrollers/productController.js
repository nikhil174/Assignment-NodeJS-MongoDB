const Product = require("../models/productModal");
const asyncHandler = require("express-async-handler");

//@desc add a product
//@route POST /api/products/add
//@access PRIVATE
const addProduct = asyncHandler(async (req, res) => {
  // checking if the user is logged in
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // checking if the all the products details are given
  const { name, description, quantity, price } = req.body;

  if (!name || !description || !quantity || !price) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }

  //creating a new Product
  const newProduct = await Product.create({
    name,
    description,
    quantity,
    price,
    _createdBy: req.user.id,
  });

  res.status(200).json({
    message: "Product Created",
    newProduct,
  });
});

//@desc get All products
//@route GET /api/products/all
//@access PRIVATE
const getAllProducts = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // getting all products from the database
  const allProducts = await Product.find();

  res.status(200).json(allProducts);
});

module.exports = {
  addProduct,
  getAllProducts,
};
