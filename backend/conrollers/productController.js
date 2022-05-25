const Product = require("../models/productModal");
const asyncHandler = require("express-async-handler");
const csvtojson = require("csvtojson");

//@desc         add a product
//@route        POST /api/products/add
//@access       PRIVATE
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

  res.status(201).json({
    message: "Product Created",
    newProduct,
  });
});

//@desc         get All products
//@route        GET /api/products/all
//@access       PRIVATE
const getAllProducts = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // getting all products from the database
  const allProducts = await Product.find();

  res.status(200).json(allProducts);
});

//@desc         insert products using .csv file
//@route        POST /api/products/addcsv
//@access       PRIVATE
const addProductCSV = asyncHandler(async (req, res) => {
  // checking if the user is logged in
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  //converting CSV file to json format and inserting all the products in database.
  csvtojson()
    .fromFile("products.csv")
    .then((csvData) => {
      const products = csvData.map((product) => {
        return { ...product, _createdBy: req.user.id };
      });
      Product.insertMany(products)
        .then(function () {
          res.status(201);
          res.json({ message: "Products created" });
        })
        .catch(function (error) {
          console.log(error);
          res.status(400);
          res.json({ message: "Something went wrong" });
        });
    });
});

module.exports = {
  addProduct,
  addProductCSV,
  getAllProducts,
};
