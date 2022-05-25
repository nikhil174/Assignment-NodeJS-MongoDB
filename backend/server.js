const express = require("express");
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//to take data from req.body
app.use(express.json());

//connect to Database
connectDB();

//setting the port
const port = process.env.PORT || 5000;

//user api
app.use("/api/users", userRoutes);
//product api
app.use("/api/products", productRoutes);

//middleware to handle the errors
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
